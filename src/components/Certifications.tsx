import React from 'react';
import { Award } from 'lucide-react';

const Certifications = () => {
  const certifications = [
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
    <section id="certifications" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Certifications
        </h2>
        <div className="max-w-3xl mx-auto grid gap-6">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <Award className="text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {cert.title}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400">
                    {cert.issuer}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mb-2">
                    Issued {cert.date}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Credential ID: {cert.credentialId}
                  </p>
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                  >
                    View Certificate →
                  </a>
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