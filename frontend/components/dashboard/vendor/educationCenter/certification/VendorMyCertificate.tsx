import { GrCertificate } from "react-icons/gr";
import { PiCertificate, PiMedal } from "react-icons/pi";

type Certificate = {
  title: string;
  subtitle: string;
  completed: string;
  credentialId: string;
  validUntil: string;
  issuedBy: string;
};

const certificates: Certificate[] = [
  {
    title: "Property Management Fundamentals",
    subtitle: "Certificate of Completion",
    completed: "March 10,2026",
    credentialId: "NPS-2026-001234",
    validUntil: "March 10,2026",
    issuedBy: "Nectar Pro Solution",
  },
  {
    title: "Property Management Fundamentals",
    subtitle: "Certificate of Completion",
    completed: "March 10,2026",
    credentialId: "NPS-2026-001234",
    validUntil: "March 10,2026",
    issuedBy: "Nectar Pro Solution",
  },
];

const VendorMyCertificate = () => {
  return (
    <section className='bg-[var(--color-section-bg)] mt-12 p-6 rounded-lg'>
      <div className='max-w-full'>
        <h2 className='text-[18px] font-bold text-[var(--color-text-primary)] mb-5'>
          My Certificates
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
          {certificates.map((cert, index) => (
            <div
              key={index}
              className='bg-white rounded-xl overflow-hidden border border-[var(--color-card-border)] shadow-sm'>
              {/* Golden Top Banner */}
              <div className='bg-[var(--color-btn-secondary-bg)] px-5 py-5'>
                <PiMedal className='text-white text-4xl mb-3' />
                <p className='text-white font-bold text-[15px]'>{cert.title}</p>
                <p className='text-white/80 text-xs mt-0.5'>{cert.subtitle}</p>
              </div>

              {/* Info Rows */}
              <div className='px-5 pt-4 pb-2'>
                {[
                  { label: "Completed", value: cert.completed, bold: false },
                  {
                    label: "Credential ID",
                    value: cert.credentialId,
                    bold: false,
                  },
                  { label: "Valid Until", value: cert.validUntil, bold: false },
                  { label: "Issued By", value: cert.issuedBy, bold: true },
                ].map((row, i) => (
                  <div
                    key={i}
                    className='flex justify-between items-center py-2 border-b border-[var(--color-divider)] last:border-none text-[13px]'>
                    <span className='text-[var(--color-placeholder-text)]'>
                      {row.label}
                    </span>
                    <span
                      className={`text-[var(--color-text-primary)] ${
                        row.bold ? "font-bold" : "font-medium"
                      }`}>
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className='flex items-center gap-4 px-5 py-4'>
                <button className='flex-1 flex items-center justify-center gap-2 bg-[var(--color-primary)] text-white text-xs font-semibold py-2.5 rounded-md hover:opacity-90 transition'>
                  <GrCertificate className='' />
                  View Certificate
                </button>
                <button className='flex-1 text-xs text-[var(--color-placeholder-text)] hover:underline text-center'>
                  Review Courses
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VendorMyCertificate;
