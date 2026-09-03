import { useEffect, useMemo, useState } from "react";
import {
  Database,
  Grip,
  Send,
  Terminal,
} from "lucide-react";

import {
  IconApi,
  IconBrandBootstrap,
  IconBrandCss3,
  IconBrandDocker,
  IconBrandGit,
  IconBrandGithub,
  IconBrandHtml5,
  IconBrandJavascript,
  IconBrandLaravel,
  IconBrandMysql,
  IconBrandNodejs,
  IconBrandPhp,
  IconBrandReact,
  IconBrandTailwind,
  IconBrandTypescript,
} from "@tabler/icons-react";

import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

import Section from "@/components/layout/Section";
import { siteCopy, skills } from "@/data/portfolio";

const skillIcons = {
  Html: IconBrandHtml5,
  Css: IconBrandCss3,
  Javascript: IconBrandJavascript,
  Tailwind: IconBrandTailwind,
  Bootstrap: IconBrandBootstrap,
  React: IconBrandReact,
  Typescript: IconBrandTypescript,
  Java: Terminal,
  Node: IconBrandNodejs,
  Php: IconBrandPhp,
  Laravel: IconBrandLaravel,
  Mysql: IconBrandMysql,
  Sqlite: Database,
  Api: IconApi,
  Docker: IconBrandDocker,
  Git: IconBrandGit,
  Github: IconBrandGithub,
  Postman: Send,
  Terminal,
};

const desktopDragQuery = "(min-width: 768px)";

const removeDuplicateSkills = (skillList) => {
  const seen = new Set();

  return skillList.filter((skill) => {
    const key = skill.name.toLowerCase().trim();

    if (seen.has(key)) return false;

    seen.add(key);
    return true;
  });
};

const useDesktopSkillDrag = () => {
  const [canDrag, setCanDrag] = useState(() => {
    if (typeof window === "undefined") return false;

    return window.matchMedia(desktopDragQuery).matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(desktopDragQuery);

    const handleChange = () => {
      setCanDrag(mediaQuery.matches);
    };

    handleChange();
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return canDrag;
};

function SkillContent({ skill, showGrip = false }) {
  const Icon = skillIcons[skill.icon] || Terminal;

  return (
    <>
      {showGrip && (
        <div
          className="absolute left-3 top-3 rounded-md border border-white/[0.07] bg-white/[0.03] p-1 text-slate-600 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:text-cyan-300"
          aria-hidden="true"
        >
          <Grip className="size-3" />
        </div>
      )}

      <div className="pointer-events-none w-full">
        <div
          className="
            mx-auto grid size-12 place-items-center
            rounded-2xl border border-white/[0.07]
            bg-white/[0.025]
            text-slate-300
            transition-all duration-300
            group-hover:-translate-y-1
            group-hover:border-cyan-300/20
            group-hover:bg-cyan-300/[0.06]
            group-hover:text-cyan-200
          "
        >
          {skill.logo ? (
            <img
              src={skill.logo}
              alt={`${skill.name} logo`}
              className="size-7 object-contain transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
              draggable={false}
            />
          ) : (
            <Icon
              className="size-7 transition-transform duration-300 group-hover:scale-105"
              aria-hidden="true"
            />
          )}
        </div>

        <h3 className="mt-3 truncate text-sm font-semibold text-slate-200 transition-colors duration-200 group-hover:text-white">
          {skill.name}
        </h3>
      </div>
    </>
  );
}

function StaticSkillCard({ skill }) {
  return (
    <article
      data-gsap-card
      className="
        group relative grid min-h-[118px]
        place-items-center rounded-2xl
        border border-white/[0.07]
        bg-[#0D1117]
        p-4 text-center
        transition-all duration-300
        hover:-translate-y-1
        hover:border-cyan-300/20
        hover:bg-white/[0.025]
      "
      style={{
        "--skill-color": skill.color,
      }}
    >
      <SkillContent skill={skill} />
    </article>
  );
}

function DraggableSkillCard({ skill }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: skill.id,
  });

  const style = {
    "--skill-color": skill.color,
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : "auto",
    opacity: isDragging ? 0.8 : 1,
    touchAction: "none",
    userSelect: "none",
    WebkitUserSelect: "none",
    WebkitTouchCallout: "none",
  };

  return (
    <article
      ref={setNodeRef}
      style={style}
      data-gsap-card
      className={`
        group relative grid min-h-[118px]
        place-items-center rounded-2xl
        border border-white/[0.07]
        bg-[#0D1117]
        p-4 text-center
        transition-all duration-300
        ${
          isDragging
            ? "cursor-grabbing border-cyan-300/30 shadow-2xl"
            : "cursor-grab hover:-translate-y-1 hover:border-cyan-300/20"
        }
      `}
      {...attributes}
      {...listeners}
    >
      <SkillContent skill={skill} showGrip />
    </article>
  );
}

function Skills() {
  const canDragSkills = useDesktopSkillDrag();

  const initialSkills = useMemo(() => {
    return removeDuplicateSkills(skills).map((skill) => ({
      ...skill,
      id: skill.name.toLowerCase().replace(/\s+/g, "-"),
    }));
  }, []);

  const [orderedSkills, setOrderedSkills] = useState(initialSkills);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 6,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const coreSkills = orderedSkills.filter((skill) => skill.core);
  const otherSkills = orderedSkills.filter((skill) => !skill.core);

  const handleDragEnd = (event, isCore) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setOrderedSkills((currentSkills) => {
      const currentGroup = currentSkills.filter(
        (skill) => Boolean(skill.core) === isCore
      );

      const otherGroup = currentSkills.filter(
        (skill) => Boolean(skill.core) !== isCore
      );

      const oldIndex = currentGroup.findIndex(
        (skill) => skill.id === active.id
      );

      const newIndex = currentGroup.findIndex(
        (skill) => skill.id === over.id
      );

      if (oldIndex === -1 || newIndex === -1) {
        return currentSkills;
      }

      const reorderedGroup = arrayMove(
        currentGroup,
        oldIndex,
        newIndex
      );

      return isCore
        ? [...reorderedGroup, ...otherGroup]
        : [...otherGroup, ...reorderedGroup];
    });
  };

  const renderSkillGrid = (items, isCore) => {
    if (!canDragSkills) {
      return (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
          {items.map((skill) => (
            <StaticSkillCard
              key={skill.id}
              skill={skill}
            />
          ))}
        </div>
      );
    }

    return (
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={(event) => handleDragEnd(event, isCore)}
      >
        <SortableContext
          items={items.map((skill) => skill.id)}
          strategy={rectSortingStrategy}
        >
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
            {items.map((skill) => (
              <DraggableSkillCard
                key={skill.id}
                skill={skill}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    );
  };

  return (
    <Section
      id="skills"
      eyebrow={siteCopy.skills.eyebrow}
      title={siteCopy.skills.title}
      description={siteCopy.skills.description}
    >
      <div className="space-y-10">
        {/* Core Stack */}
        <div>
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-cyan-300" />

                <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
                  Core Stack
                </h3>
              </div>

              <p className="mt-1.5 text-xs text-slate-600">
                Technologies I use most frequently.
              </p>
            </div>

            <span className="hidden text-[10px] font-medium uppercase tracking-[0.14em] text-slate-600 sm:block">
              {String(coreSkills.length).padStart(2, "0")} technologies
            </span>
          </div>

          {renderSkillGrid(coreSkills, true)}
        </div>

        {/* Other Technologies */}
        {otherSkills.length > 0 && (
          <div>
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-slate-500" />

                  <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Other Technologies
                  </h3>
                </div>

                <p className="mt-1.5 text-xs text-slate-600">
                  Additional tools and technologies in my toolkit.
                </p>
              </div>

              <span className="hidden text-[10px] font-medium uppercase tracking-[0.14em] text-slate-600 sm:block">
                {String(otherSkills.length).padStart(2, "0")} technologies
              </span>
            </div>

            {renderSkillGrid(otherSkills, false)}
          </div>
        )}

        {/* Interaction hint */}
        {canDragSkills && (
          <div className="flex items-center justify-center gap-2 pt-1 text-[10px] font-medium uppercase tracking-[0.14em] text-slate-600">
            <Grip className="size-3" />
            Drag to reorder
          </div>
        )}
      </div>
    </Section>
  );
}

export default Skills;