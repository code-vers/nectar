import { Course } from "@/types/course.type";
import Image from "next/image";
import React from "react";
import { FiBookOpen, FiClock, FiPlayCircle, FiUsers } from "react-icons/fi";
import ProgressBar from "./ProgressBar";

interface ReusableCourseCardProps {
    course: Course;
    onStart?: (course: Course) => void;
    layout?: "grid" | "row";
}

const CourseCard: React.FC<ReusableCourseCardProps> = ({
    course,
    onStart,
    layout = "grid",
}) => {
    const hasDescription = Boolean(course.course_description?.trim());
    const hasProgress = typeof course.progressPercent === "number";
    const progressValue = Math.max(
        0,
        Math.min(100, course.progressPercent ?? 0),
    );
    const actionLabel = course.actionLabel || "Start Courses";
    const secondaryActionLabel =
        course.secondaryActionLabel || "Review Courses";

    if (layout === "row") {
        return (
            <div className="w-full rounded-[10px] border border-(--color-card-border) bg-(--color-card-bg) p-3.5 shadow-[0_2px_10px_rgba(15,23,42,0.06)]">
                <div className="flex flex-col gap-3 md:flex-row">
                    <div className="relative md:w-[38%]">
                        <Image
                            width={400}
                            height={220}
                            src={course.course_banner}
                            alt={course.title}
                            className="h-42 w-full rounded-lg object-cover"
                        />
                        <button
                            type="button"
                            aria-label="Play course preview"
                            className="absolute inset-0 m-auto flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-(--color-btn-primary-bg)"
                        >
                            <FiPlayCircle className="text-xl" />
                        </button>
                    </div>

                    <div className="flex flex-1 flex-col gap-3">
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <h3 className="text-lg font-medium leading-[1.35] text-(--color-text-primary)">
                                    {course.title}
                                </h3>
                                {hasDescription && (
                                    <p className="mt-1 text-xs text-(--color-placeholder-text)">
                                        {course.course_description}
                                    </p>
                                )}
                            </div>
                            {course?.badgeText && (
                                <span className="rounded-full bg-[#DFF9E5] px-2.5 py-1 text-[10px] font-semibold text-[#13A252]">
                                    {course.badgeText}
                                </span>
                            )}
                        </div>

                        <div className="flex items-center gap-5 pt-1 text-xs text-(--color-placeholder-text)">
                            <span className="inline-flex items-center gap-1.5">
                                <FiBookOpen className="text-[13px]" />
                                {course.completedLessons ?? 0}/
                                {course.totalLessons ?? 0} Completed
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                                <FiClock className="text-[13px]" />
                                {course.totalHours} Hours
                            </span>
                        </div>

                        {hasProgress && (
                            <div>
                                <div className="mb-1 flex items-center justify-between">
                                    <span className="text-xs text-(--color-text-primary)">
                                        Progress
                                    </span>
                                    <span className="text-xs text-(--color-placeholder-text)">
                                        {progressValue}%
                                    </span>
                                </div>
                                <ProgressBar
                                    value={progressValue}
                                    height={4}
                                />
                            </div>
                        )}

                        <div className="mt-1 flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() => onStart?.(course)}
                                className="rounded-md border border-(--color-input-border) bg-(--color-btn-primary-bg) px-4 py-2 text-xs font-semibold text-(--color-primary-btn-text) transition hover:opacity-95"
                            >
                                {actionLabel}
                            </button>

                            {course.secondaryActionLabel && (
                                <button
                                    type="button"
                                    className="rounded-md border border-(--color-input-border) bg-white px-4 py-2 text-xs font-medium text-(--color-placeholder-text)"
                                >
                                    {secondaryActionLabel}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full  rounded-xl border border-(--color-card-border) bg-(--color-card-bg) p-3.5 shadow-[0_2px_10px_rgba(15,23,42,0.06)]">
            <div className="relative">
                <Image
                    width={200}
                    height={200}
                    src={course.course_banner}
                    alt={course.title}
                    className="w-full rounded-lg object-cover"
                />

                {course?.lavel && (
                    <span className="absolute top-2 left-2 rounded-full bg-(--color-btn-primary-bg) px-2.5 py-1 text-[11px] font-medium text-(--color-primary-btn-text)">
                        {course?.lavel}
                    </span>
                )}
            </div>

            <div className="mt-4 space-y-1.5 px-0.5">
                <h3 className="line-clamp-1 text-[27px] font-medium leading-[1.35] text-(--color-text-primary)">
                    {course.title}
                </h3>

                {hasDescription && (
                    <p className="line-clamp-1 text-xs text-(--color-placeholder-text)">
                        {course.course_description}
                    </p>
                )}

                <div className="flex items-center gap-5 pt-1 text-xs text-(--color-placeholder-text)">
                    <span className="inline-flex items-center gap-1.5">
                        <FiClock className="text-[13px]" />
                        {course.totalHours}hours
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                        <FiUsers className="text-[13px]" />
                        {course.totalEnroll}
                    </span>
                </div>
            </div>

            {hasProgress && (
                <div className="mt-3">
                    <div className="mb-1 flex items-center justify-between">
                        <span className="text-xs text-(--color-text-primary)">
                            Progress
                        </span>
                        <span className="text-xs text-(--color-placeholder-text)">
                            {progressValue}%
                        </span>
                    </div>
                    <ProgressBar
                        value={progressValue}
                        height={4}
                    />
                </div>
            )}

            <button
                type="button"
                onClick={() => onStart?.(course)}
                className="mt-5 w-full rounded-md border border-(--color-input-border) bg-(--color-btn-primary-bg) px-4 py-3 text-sm font-semibold text-(--color-primary-btn-text) transition hover:opacity-95"
            >
                {actionLabel}
            </button>
        </div>
    );
};

export default CourseCard;
