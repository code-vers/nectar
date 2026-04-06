import CenterBanner from '@/components/website/center/CenterBanner';

const page = () => {
  return (
    <div>
      <CenterBanner heading='Resident Success Academy
' description='Courses and resources designed to help residents build life skills, manage their homes responsibly, improve financial wellness, and grow personally.
' 
  primaryButton={{
          text: "Browse Course",
          href: "/"
        }}
        secondaryButton={
          {
            text:'Explore Resources',
            href:'/'
          }
        }
/>

    </div>
  );
};

export default page;