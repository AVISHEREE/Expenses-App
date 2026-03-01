import Navbar from "@/components/navbar.jsx";

export default function AboutPage() {
  return (
    <>
      <Navbar page={{ name: "Home", route: "" }} />
      <div className="min-h-screen text-new-text-color font-chakra-petch p-6 pb-20">
        <div className="max-w-3xl mx-auto space-y-6">

          {/* About the Project */}
          <div className="p-6 rounded-2xl bg-white shadow-lg border-t-4 border-indigo-500">
            <h2 className="text-2xl font-bold text-heading-color">🚀 About the Project</h2>
            <p className="mt-3 text-gray-700 leading-relaxed">
              <span className="font-bold text-indigo-600">Expense Assist App</span> is a full-stack personal finance tracker
              built with <strong>React</strong>, <strong>Node.js</strong>, and <strong>MySQL</strong>.
              It helps you effortlessly track daily expenses, visualize spending patterns with interactive charts,
              and stay on top of your finances — all in a clean, mobile-friendly interface.
            </p>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                ["⚛️", "React + Vite"],
                ["🎨", "Tailwind CSS"],
                ["📊", "Recharts"],
                ["🔒", "JWT Auth"],
                ["🗄️", "Node + MySQL"],
                ["🎤", "Voice Input"],
              ].map(([icon, label]) => (
                <div key={label} className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2 text-sm font-medium text-gray-700">
                  <span>{icon}</span> {label}
                </div>
              ))}
            </div>
          </div>

          {/* About Me */}
          <div className="p-6 rounded-2xl bg-white shadow-lg border-t-4 border-emerald-500">
            <h2 className="text-2xl font-bold text-heading-color">👨‍💻 About Me</h2>
            <p className="mt-3 text-gray-700 leading-relaxed">
              I'm <span className="font-bold text-emerald-600">Akash Vyas</span>, a software developer with a strong focus on
              full-stack web development. Currently pursuing my B.Sc. in IT, I love tackling real-world projects that push me
              to grow. My goal is to become a top-tier programmer and eventually build products that solve genuine problems.
            </p>
          </div>

          {/* Favorite Projects */}
          <div className="p-6 rounded-2xl bg-white shadow-lg border-t-4 border-amber-500">
            <h2 className="text-2xl font-bold text-heading-color">🌟 My Projects</h2>
            <ul className="mt-4 space-y-3 text-gray-700">
              {[
                {
                  icon: "🌐",
                  href: "https://mvcreation.co.in",
                  label: "Portfolio for Graphic Designer",
                  desc: "A portfolio website built with HTML & CSS",
                },
                {
                  icon: "💻",
                  href: "https://javascript-projects-navy.vercel.app/",
                  label: "JavaScript Projects",
                  desc: "JS projects from beginner to advanced",
                },
                {
                  icon: "🔥",
                  href: "https://github.com/AVISHEREE/30-Days-js-challenge",
                  label: "30-Days JS Challenge",
                  desc: "Master JavaScript through hands-on practice",
                },
                {
                  icon: "🛒",
                  href: "https://github.com/AVISHEREE/Product-sells",
                  label: "Product Sells",
                  desc: "E-commerce platform with React, Node.js & MongoDB",
                },
                {
                  icon: "🎥",
                  href: "https://github.com/AVISHEREE/backend-on-youtube",
                  label: "Backend on YouTube",
                  desc: "Backend practice inspired by YouTube tutorials",
                },
              ].map(({ icon, href, label, desc }) => (
                <li key={label} className="flex gap-3 items-start group">
                  <span className="text-xl mt-0.5">{icon}</span>
                  <div>
                    <a href={href} className="font-semibold text-indigo-600 hover:underline group-hover:text-indigo-800 transition"
                      target="_blank" rel="noopener noreferrer">
                      {label}
                    </a>
                    <p className="text-sm text-gray-500">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* GitHub Stats */}
          <div className="p-6 rounded-2xl bg-white shadow-lg border-t-4 border-purple-500">
            <h2 className="text-2xl font-bold text-heading-color">📈 GitHub Stats</h2>
            <div className="mt-4 space-y-3">
              <img
                src="https://github-readme-stats.vercel.app/api?username=AVISHEREE&show_icons=true&theme=tokyonight"
                alt="GitHub Stats"
                className="rounded-xl w-full"
                loading="lazy"
              />
              <img
                src="https://github-readme-streak-stats.herokuapp.com/?user=AVISHEREE&theme=tokyonight"
                alt="GitHub Streak"
                className="rounded-xl w-full"
                loading="lazy"
              />
            </div>
          </div>

          {/* Contact */}
          <div className="p-6 rounded-2xl bg-white shadow-lg border-t-4 border-rose-500">
            <h2 className="text-2xl font-bold text-heading-color">📫 Get In Touch</h2>
            <div className="mt-4 space-y-3">
              {[
                {
                  icon: "📱",
                  href: "https://wa.me/7888082956",
                  label: "WhatsApp: +91 788808XXXX",
                },
                {
                  icon: "🔗",
                  href: "https://www.linkedin.com/in/akash-vyas-880914290/",
                  label: "LinkedIn: akash-vyas-880914290",
                },
                {
                  icon: "🧑‍💻",
                  href: "https://github.com/AVISHEREE",
                  label: "GitHub: AVISHEREE",
                },
              ].map(({ icon, href, label }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-700 hover:text-indigo-600 transition group">
                  <span className="text-xl">{icon}</span>
                  <span className="group-hover:underline">{label}</span>
                </a>
              ))}
              <p className="text-gray-700 flex items-center gap-3">
                <span className="text-xl">📧</span>
                <span>
                  <a href="mailto:akashvyas2006@gmail.com" className="hover:text-indigo-600 hover:underline transition">
                    akashvyas2006@gmail.com
                  </a>
                  {" · "}
                  <a href="mailto:vyassakash3@gmail.com" className="hover:text-indigo-600 hover:underline transition">
                    vyassakash3@gmail.com
                  </a>
                </span>
              </p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}