import React from 'react';

export default function Legal() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-4xl">
        
        <h1 className="text-4xl font-bold mb-4 text-purple-500">Privacy Policy</h1>
        <p className="text-zinc-500 mb-12">Last Modified: January 24, 2026</p>
        
        <div className="space-y-8 text-gray-300 leading-relaxed font-light text-sm md:text-base">

          {/* SECTION 1 */}
          <section>
            <h2 className="text-xl font-bold text-white mb-4">1. Introduction</h2>
            <p className="mb-4">
              AiMasterji (a division of ProfessorsAI, or "We") respects your privacy and we are committed to protecting it through our compliance with this policy. This policy describes:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-zinc-400">
              <li>The types of information we may collect or that you may provide when you download, install, register with, access, or use the AiMasterji App (the “App”).</li>
              <li>The types of information we may collect or that you may provide when you purchase or use the AiMasterji Robots (Mimi, Simba, Prince) or their successors (individually and collectively, the “Device”).</li>
              <li>The types of information that we may collect or that you may provide when you visit the website (aimasterji.professorsai.org) (our “Website”).</li>
              <li>Our practices for collecting, using, maintaining, protecting, and disclosing that information.</li>
            </ul>
            <p className="mt-4">
              Please read this policy carefully to understand our policies and practices regarding your information and how we will treat it. If you do not agree with our policies and practices, do not use the Website, App, or Device.
            </p>
          </section>

          {/* SECTION 2 */}
          <section>
            <h2 className="text-xl font-bold text-white mb-4">2. Use of App by Minors Under the Age of 18</h2>
            <p>
              The Website and the App are not intended for minors under the age of 18. The Website and App are intended for adult parents of children to purchase and set up the Device. We do not knowingly collect personal information from minors under 18 via the Website or the App directly. We do collect personal information about children *from their parents* via the Website or the App.
            </p>
          </section>

          {/* SECTION 3 - COPPA */}
          <section>
            <h2 className="text-xl font-bold text-white mb-4">3. Children Under the Age of 13</h2>
            <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
              <p className="mb-4 text-white font-medium">
                The Children’s Online Privacy Protection Act (COPPA) requires us to inform parents about our practices for collecting, using, and disclosing personal information from children under 13.
              </p>
              
              <h3 className="text-white font-bold mt-6 mb-2">A. Information We Collect</h3>
              <p className="mb-4">
                Children can interact with the Device (Mimi/Simba/Prince) using their voice. This results in the temporary collection of a voice audio file. We use this audio solely to generate a text transcription to power the interaction. 
                <span className="block mt-2 text-purple-400">
                  After transcribing the audio to text, we promptly delete the associated audio files.
                </span>
                The transcription is retained for up to 90 days to allow parents to monitor interactions, after which it is automatically deleted.
              </p>

              <h3 className="text-white font-bold mt-6 mb-2">B. How We Use Child’s Information</h3>
              <p className="mb-4">
                We use the information to allow the Device to have a natural, educational conversation with the child. We may pass text data to a third-party AI language model to generate responses. These third parties do not retain information for training purposes.
              </p>

              <h3 className="text-white font-bold mt-6 mb-2">C. Disclosure</h3>
              <p>
                We do not sell, rent, or transfer children’s personal information. We only disclose it to service providers (like ElevenLabs or OpenAI) strictly to support the internal operations of the Device.
              </p>
            </div>
          </section>

          {/* SECTION 4 */}
          <section>
            <h2 className="text-xl font-bold text-white mb-4">4. Information We Collect and How We Collect It</h2>
            <p className="mb-4">We collect information from and about users of our Website, App and Device:</p>
            <ul className="list-disc pl-5 space-y-2 text-zinc-400">
              <li>Directly from you when you provide it to us (e.g., during Setup).</li>
              <li>Automatically when you use the Website, App or Device (e.g., Device ID, IP Address).</li>
            </ul>
            <p className="mt-4">
               <strong>Location Information:</strong> The App collects real-time information about the location of your device to enrich the conversational functionality (e.g., discussing local weather) and to support Bluetooth connectivity.
            </p>
          </section>

          {/* SECTION 5 */}
          <section>
            <h2 className="text-xl font-bold text-white mb-4">5. Data Security</h2>
            <p>
              We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access. This includes App authentication via ProfessorsAI SSO, and encryption of sensitive information. Communications between the Device and our servers are encrypted using industry-standard protocols.
            </p>
          </section>

          {/* SECTION 6 */}
          <section>
            <h2 className="text-xl font-bold text-white mb-4">6. Contact Information</h2>
            <p className="mb-4">
              To ask questions or comment about this privacy policy and our privacy practices, contact us at:
            </p>
            <div className="bg-zinc-900 p-4 rounded-lg inline-block pr-12">
              <p className="text-white font-bold">AiMasterji Privacy Team</p>
              <p className="text-zinc-400">ProfessorsAI Headquarters</p>
              <p className="text-purple-400 mt-2">privacy@professorsai.org</p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}