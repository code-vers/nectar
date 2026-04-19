import VendorMonthlyProgressStats from "./VendorMonthlyProgressStats";
import VendorMonthlyProgressVar from "./VendorMonthlyProgressVar";
import VendorMonthlyTaskList from "./VendorMonthlyTaskList";

const VendorMonthlyProgress = () => {
  return (
    <div>
      <VendorMonthlyProgressStats />
      <VendorMonthlyProgressVar />
      <VendorMonthlyTaskList />
    </div>
  );
};

export default VendorMonthlyProgress;
