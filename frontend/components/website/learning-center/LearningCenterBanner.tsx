import CenterBanner from "../center/CenterBanner";

const LearningCenterBanner = () => {
  return (
    <div>
      <CenterBanner
        heading="Children's Learning Center"
        description='Educational books, workbooks, and activities designed to help children learn, explore, and grow.'
        primaryButton={{
          text: "Search",
          href: "/",
        }}
      />
    </div>
  );
};

export default LearningCenterBanner;
