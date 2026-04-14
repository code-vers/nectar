import VendorStats from "./VendorStats";
import VendorSuccessPath from "./VendorSuccessPath";
import Welcome from "./Welcome";

const VendorDashboard = () => {
  return (
    <div>
      <Welcome />
      <VendorStats />
      <VendorSuccessPath />
    </div>
  );
};

export default VendorDashboard;
