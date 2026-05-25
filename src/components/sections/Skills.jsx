import { useEffect, useMemo, useState } from "react";
import { Coffee, Database, Grip, Send, Terminal } from "lucide-react";
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
  Java: Coffee,
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
    const handleChange = () => setCanDrag(mediaQuery.matches);

    handleChange();
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return canDrag;
};

function SkillContent({ skill, showGrip = false }) {
  const Icon = skillIcons[skill.icon] || Terminal;

  return (
    <>
      {showGrip && (
        <div
          className="absolute left-2 top-2 rounded-full border border-white/10 bg-white/[0.06] p-1 text-slate-500 transition-colors group-hover:border-cyan-300/30 group-hover:text-cyan-200"
          aria-hidden="true"
        >
          <Grip className="size-3.5" />
        </div>
      )}

      <div className="pointer-events-none">
        <div className="skill-logo-shell mx-auto grid size-11 place-items-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-slate-300 transition-all duration-200 group-hover:border-violet-300/40">
          {skill.logo ? (
            <img
              src={skill.logo}
              alt={`${skill.name} logo`}
              className="skill-logo-img size-7 object-contain transition-all duration-200"
              loading="lazy"
              draggable={false}
            />
          ) : (
            <Icon
              className="skill-logo-icon size-7 transition-colors duration-200"
              aria-hidden="true"
            />
          )}
        </div>

        <h3 className="mt-2 text-sm font-semibold text-white">
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
      className="skill-logo-card glass-card group relative grid min-h-24 list-none place-items-center p-3 text-center transition-colors hover:border-violet-300/40"
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
    opacity: isDragging ? 0.85 : 1,
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
      className={`skill-logo-card glass-card group relative grid min-h-24 list-none place-items-center p-3 text-center transition-colors hover:border-violet-300/40 ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
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

      const reorderedGroup = arrayMove(currentGroup, oldIndex, newIndex);

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
            <StaticSkillCard key={skill.id} skill={skill} />
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
              <DraggableSkillCard key={skill.id} skill={skill} />
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
      <div className="grid gap-6">
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase text-slate-300">
            Core Stack
          </h3>
          {renderSkillGrid(coreSkills, true)}
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase text-slate-300">
            Other Technologies
          </h3>
          {renderSkillGrid(otherSkills, false)}
        </div>
      </div>
    </Section>
  );
}

export default Skills;
