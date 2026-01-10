import { Award } from 'lucide-react';

const Certifications = () => {
  const certifications = [
    {
      title: 'Adobe Graphic Designer',
      issuer: 'Adobe',
      date: 'Oct 2025',
      credentialId: 'LD5ITWS1R4E3',
      link: 'https://www.coursera.org/account/accomplishments/specialization/LD5ITWS1R4E3'
    },
    {
      title: 'Adobe Marketing Specialist',
      issuer: 'Adobe',
      date: 'Oct 2025',
      credentialId: 'R2RQYR8N0YY9',
      link: 'https://www.coursera.org/account/accomplishments/specialization/R2RQYR8N0YY9'
    },
    {
      title: 'Digital Marketing',
      issuer: 'Adobe',
      date: 'Oct 2025',
      credentialId: 'GXNKNB9I9JG2',
      link: 'https://www.coursera.org/account/accomplishments/verify/GXNKNB9I9JG2'
    },
    {
      title: 'Advanced Prompt Engineering with ChatGPT',
      issuer: 'upGrad',
      date: 'Sep 2025',
      credentialId: 'jaNsiYhOz8Mk5FDd',
      link: 'https://www.upgrad.com/certificates/jaNsiYhOz8Mk5FDd'
    },
    {
      title: 'Graphic Design',
      issuer: 'Adobe',
      date: 'Sep 2025',
      credentialId: 'PORZNEU585D0',
      link: 'https://www.coursera.org/account/accomplishments/verify/PORZNEU585D0'
    },
    {
      title: 'Deloitte Australia - Cyber Job Simulation',
      issuer: 'Forage',
      date: 'Jul 2025',
      credentialId: 'ttwEQC4uXrticcRDL',
      link: 'https://forage.com/simulations/ttwEQC4uXrticcRDL'
    },
    {
      title: 'Deloitte Australia - Data Analytics Job Simulation',
      issuer: 'Forage',
      date: 'Jul 2025',
      credentialId: 'avYGWxfBtoGzkTfRp',
      link: 'https://forage.com/simulations/avYGWxfBtoGzkTfRp'
    },
    {
      title: 'Tata - Data Visualisation: Empowering Business with Effective Insights Job Simulation',
      issuer: 'Forage',
      date: 'Jul 2025',
      credentialId: 'XrxgqYdQ7fTTWPrdd',
      link: 'https://forage.com/simulations/XrxgqYdQ7fTTWPrdd'
    },
    {
      title: 'Develop GenAI Apps with Gemini and Streamlit',
      issuer: 'Google',
      date: 'May 2024',
      credentialId: '8886977',
      link: 'https://www.cloudskillsboost.google/public_profiles/244b393c-66e4-4e6b-9155-5ecfcd510c75/badges/8886977'
    },
    {
      title: 'Programming for Everybody',
      issuer: 'University of Michigan',
      date: 'Apr 2024',
      credentialId: 'TQNT2TS885BR',
      link: 'https://www.coursera.org/account/accomplishments/verify/TQNT2TS885BR'
    },
    {
      title: 'Python (Basic)',
      issuer: 'Hacker Rank',
      date: 'Apr 2024',
      credentialId: '99cd52db45dd',
      link: 'https://www.hackerrank.com/certificates/99cd52db45dd'
    },
    {
      title: 'Responsible AI: Applying AI Principles with Google Cloud',
      issuer: 'Google',
      date: 'May 10 2024',
      credentialId: 'GOOGLE-8957127',
      link: 'https://www.cloudskillsboost.google/public_profiles/244b393c-66e4-4e6b-9155-5ecfcd510c75/badges/8957127'
    }
  ];

  return (
    <section id="certifications" className="py-16 md:py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white mb-8 md:mb-12">
          Certifications & Trainings
        </h2>

        {/* Featured Certificate */}
        <div className="max-w-4xl mx-auto mb-8 md:mb-12">
          {certifications.filter(c => c.featured).map((cert, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-900 dark:to-blue-700 rounded-lg p-6 md:p-8 shadow-lg text-white"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
                <div className="flex-1">
                  <p className="text-blue-100 text-sm md:text-base mb-2">FEATURED</p>
                  <h3 className="text-xl md:text-2xl font-bold mb-2">
                    {cert.title}
                  </h3>
                  <p className="text-blue-50 font-semibold mb-2">{cert.issuer}</p>
                  {cert.description && (
                    <p className="text-blue-100 text-sm md:text-base mb-3">
                      {cert.description}
                    </p>
                  )}
                  <p className="text-blue-100 text-xs md:text-sm">
                    {cert.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Other Certifications */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {certifications.filter(c => !c.featured).map((cert, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-lg p-5 md:p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-3 md:gap-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg flex-shrink-0">
                  <Award className="text-blue-600 dark:text-blue-400 w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-1 break-words">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">
                    {cert.issuer}
                  </p>
                  <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {cert.date}
                  </p>
                  {cert.link && cert.link !== '#' && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline text-xs md:text-sm inline-block"
                    >
                      View Certificate →
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;