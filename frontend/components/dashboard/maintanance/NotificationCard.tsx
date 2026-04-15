import { ReactNode } from "react";
import { FiInfo } from "react-icons/fi";

type NotificationCardProps = {
  title: string;
  description: string;
  date: string;
  author?: string;
  tag?: string;
  icon?: ReactNode;
};

export default function NotificationCard({
  title,
  description,
  date,
  author,
  tag,
  icon,
}: NotificationCardProps) {
  return (
    <div className="w-full border border-gray-200 rounded-lg bg-gray-50 p-4 flex justify-between items-start">
      
      {/* Left Content */}
      <div className="flex gap-3">
        <div className="mt-1 text-blue-500 text-lg">
          {icon || <FiInfo />}
        </div>

        <div>
          <h3 className="font-semibold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>

          <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
            <span>{date}</span>
            {author && (
              <>
                <span>•</span>
                <span>{author}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Right Tag */}
      {tag && (
        <span className="text-xs bg-gray-200 text-gray-600 px-3 py-1 rounded-full">
          {tag}
        </span>
      )}
    </div>
  );
}