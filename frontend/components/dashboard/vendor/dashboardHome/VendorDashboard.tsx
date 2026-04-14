import ProgressTracing from "./ProgressTracing";
import VendorCertificate from "./VendorCertificate";
import VendorStats from "./VendorStats";
import VendorSuccessPath from "./VendorSuccessPath";
import Welcome from "./Welcome";

const VendorDashboard = () => {
  return (
    <div>
      <Welcome />
      <VendorStats />
      <VendorSuccessPath />
      <VendorCertificate />
      <ProgressTracing />
    </div>
  );
};

export default VendorDashboard;
