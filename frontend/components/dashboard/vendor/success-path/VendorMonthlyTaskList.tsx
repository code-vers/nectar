type TaskStatus = "completed" | "pending";

type TaskItem = {
  title: string;
  status: TaskStatus;
  dateLabel: string;
  durationLabel: string;
  actionLabel: string;
  primaryAction?: boolean;
};

const TASKS: TaskItem[] = [
  {
    title: "Watch Introduction video",
    status: "completed",
    dateLabel: "mar 1",
    durationLabel: "10min",
    actionLabel: "Review",
  },
  {
    title: "Complete Property Basics Quiz",
    status: "completed",
    dateLabel: "mar 1",
    durationLabel: "10min",
    actionLabel: "Review",
  },
  {
    title: "Download Month 1 Workbook",
    status: "pending",
    dateLabel: "mar 1",
    durationLabel: "45min",
    actionLabel: "Start",
    primaryAction: true,
  },
];

const statusStyles: Record<TaskStatus, string> = {
  completed: "bg-[#DFF8E7] text-[#34B566]",
  pending: "bg-[#FFE9CA] text-[#D79A2F]",
};

const TaskListIcon = () => {
  return (
    <div className='w-8 h-8 rounded-sm bg-[#F1CF80] flex items-center justify-center shrink-0'>
      <svg
        width='14'
        height='14'
        viewBox='0 0 20 20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'>
        <circle cx='10' cy='10' r='6.5' stroke='white' strokeWidth='1.5' />
        <path
          d='M7.5 10.2L9.2 11.9L12.6 8.5'
          stroke='white'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </div>
  );
};

const VendorMonthlyTaskList = () => {
  return (
    <section className='mt-4 bg-[#F3F5F9] border border-[#E3E7EE] rounded-sm p-4 sm:p-5'>
      <h3 className='text-[30px] font-semibold leading-[1.2] text-[#273248] mb-3'>
        Month 2 Task List
      </h3>

      <div className='rounded-sm border border-[#E6EAF1] bg-[#F3F5F9]'>
        {TASKS.map((task, index) => (
          <div
            key={task.title}
            className={`flex items-center justify-between gap-4 px-3 py-3 ${
              index !== TASKS.length - 1 ? "border-b border-[#E6EAF1]" : ""
            }`}>
            <div className='flex items-center gap-3 min-w-0'>
              <TaskListIcon />

              <div className='min-w-0'>
                <div className='flex items-center gap-2 flex-wrap'>
                  <p className='text-[13px] font-medium leading-tight text-[#1F2937]'>
                    {task.title}
                  </p>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-semibold leading-none ${statusStyles[task.status]}`}>
                    {task.status === "completed" ? "Completed" : "Pending"}
                  </span>
                </div>

                <div className='mt-1 flex items-center gap-3'>
                  <div className='flex items-center gap-1'>
                    <svg
                      width='10'
                      height='10'
                      viewBox='0 0 20 20'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M6.5 1.7V4.1M13.5 1.7V4.1M2.9 7.2H17.1M4.5 3.3H15.5C16.4 3.3 17.1 4 17.1 4.9V15.5C17.1 16.4 16.4 17.1 15.5 17.1H4.5C3.6 17.1 2.9 16.4 2.9 15.5V4.9C2.9 4 3.6 3.3 4.5 3.3Z'
                        stroke='#9CA3AF'
                        strokeWidth='1.4'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                    <span className='text-[9px] leading-none text-[#9CA3AF]'>
                      {task.dateLabel}
                    </span>
                  </div>

                  <span className='inline-flex items-center rounded-full px-2 py-0.5 text-[9px] leading-none text-[#8E96A3] bg-[#E1E5EC]'>
                    {task.durationLabel}
                  </span>
                </div>
              </div>
            </div>

            <button
              type='button'
              className={`h-6 min-w-16.5 rounded-[3px] px-3 text-[10px] font-semibold leading-none transition-colors ${
                task.primaryAction
                  ? "bg-[#1F2A4B] text-white hover:bg-[#18213D]"
                  : "border border-[#D5DAE3] bg-[#EFF2F7] text-[#A0A8B7] hover:bg-[#E7ECF4]"
              }`}>
              {task.actionLabel}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default VendorMonthlyTaskList;
