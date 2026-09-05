import { useCallback, useEffect, useMemo, useState } from "react";
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
  DragOverlay,
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

// ---- Helpers ----
const removeDuplicateSkills = (skillList) => {
  const seen = new Set();
  return skillList.filter((skill) => {
    const key = skill.name.toLowerCase().trim();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

// ---- Custom Hook for Desktop Drag Permission ----
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

// ---- Skill Content (shared between static & draggable cards) ----
function SkillContent({ skill, showGrip = false, dragHandleProps }) {
  const Icon = skillIcons[skill.icon] || Terminal;

  return (
    <>
      {showGrip && (
        <button
          ref={dragHandleProps?.setActivatorNodeRef}
          type="button"
          aria-label={`Drag ${skill.name} to reorder`}
          className="absolute left-3 top-3 grid size-8 cursor-grab place-items-center rounded-md border border-white/[0.07] bg-white/[0.03] text-slate-500 opacity-0 transition-all duration-200 hover:border-cyan-300/30 hover:bg-cyan-300/[0.08] hover:text-cyan-200 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-cyan-300/50 group-hover:opacity-100"
          {...dragHandleProps?.attributes}
          {...dragHandleProps?.listeners}
        >
          <Grip className="size-3" />
        </button>
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

// ---- Static Card (non‑draggable) ----
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
      style={{ "--skill-color": skill.color }}
    >
      <SkillContent skill={skill} />
    </article>
  );
}

// ---- Draggable Card ----
function DraggableSkillCard({ skill }) {
  const {
    attributes,
    listeners,
    setActivatorNodeRef,
    setNodeRef,
    transform,
    transition: sortableTransition,
    isDragging,
  } = useSortable({ id: skill.id });

  // Use a consistent transition only for transform, and remove it while dragging
  // to prevent conflicts with dnd-kit's own animations.
  const style = {
    "--skill-color": skill.color,
    transform: CSS.Transform.toString(transform),
    transition: isDragging
      ? "none"
      : (sortableTransition || "transform 180ms cubic-bezier(0.22, 1, 0.36, 1)"),
    zIndex: isDragging ? 50 : "auto",
    opacity: isDragging ? 0.35 : 1,
    willChange: isDragging ? "transform" : "auto",
    touchAction: "manipulation",
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
        transition-[transform,opacity,box-shadow,border-color] duration-200 ease-out
        ${
          isDragging
            ? "cursor-grabbing border-cyan-300/30 shadow-2xl shadow-cyan-950/40"
            : "cursor-grab hover:-translate-y-1 hover:border-cyan-300/20"
        }
      `}
    >
      <SkillContent
        skill={skill}
        showGrip
        dragHandleProps={{
          attributes,
          listeners,
          setActivatorNodeRef,
        }}
      />
    </article>
  );
}

// ---- Drag Overlay ----
function SkillDragOverlay({ skill }) {
  if (!skill) return null;

  return (
    <article
      className="
        relative grid min-h-[118px] w-36 place-items-center
        rounded-2xl border-2 border-cyan-300/40
        bg-[#1A2332] p-4 text-center
        shadow-2xl shadow-cyan-950/60
        scale-105
      "
      style={{ "--skill-color": skill.color }}
    >
      <SkillContent skill={skill} />
    </article>
  );
}

// ---- Main Component ----
function Skills() {
  const canDragSkills = useDesktopSkillDrag();

  // Prepare initial skills with unique IDs
  const initialSkills = useMemo(() => {
    return removeDuplicateSkills(skills).map((skill) => ({
      ...skill,
      id: skill.name.toLowerCase().replace(/\s+/g, "-"),
    }));
  }, []);

  const [orderedSkills, setOrderedSkills] = useState(initialSkills);
  const [activeSkill, setActiveSkill] = useState(null);

  // Sensors configuration (only active on desktop)
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Memoize filtered groups to avoid recalculation on each render
  const coreSkills = useMemo(
    () => orderedSkills.filter((skill) => skill.core),
    [orderedSkills]
  );
  const otherSkills = useMemo(
    () => orderedSkills.filter((skill) => !skill.core),
    [orderedSkills]
  );

  // Drag end handler – memoised to keep reference stable
  const handleDragEnd = useCallback(
    (event, isCore) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;

      setOrderedSkills((currentSkills) => {
        // Separate into the dragged group and the other group
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

        if (oldIndex === -1 || newIndex === -1) return currentSkills;

        const reorderedGroup = arrayMove(currentGroup, oldIndex, newIndex);

        // Re‑combine groups in the correct order
        return isCore
          ? [...reorderedGroup, ...otherGroup]
          : [...otherGroup, ...reorderedGroup];
      });
    },
    []
  );

  // Render a grid of skills (static or draggable)
  const renderSkillGrid = useCallback(
    (items, isCore) => {
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
          onDragStart={({ active }) => {
            setActiveSkill(items.find((skill) => skill.id === active.id) || null);
          }}
          onDragCancel={() => setActiveSkill(null)}
          onDragEnd={(event) => {
            handleDragEnd(event, isCore);
            setActiveSkill(null);
          }}
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

          <DragOverlay
            dropAnimation={{
              duration: 180,
              easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <SkillDragOverlay skill={activeSkill} />
          </DragOverlay>
        </DndContext>
      );
    },
    [canDragSkills, sensors, handleDragEnd]
  );

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