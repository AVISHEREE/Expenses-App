import Navbar from "@/components/navbar";
export default function AboutPage() {
    return (
        <>
    <Navbar page = {{name:'home',route:''}}/>
      <div className="min-h-screen text-new-text-color font-chakra-petch p-6">
        <div className="max-w-3xl mx-auto">

        {/* About the Project Section */}
        <div className="p-6 rounded-2xl bg-white shadow-lg mb-6">
            <h2 className="text-2xl font-bold text-heading-color">About the Project</h2>
            <p className="mt-2 text-lg">
              <span className="font-bold">MoneyFlowControl</span> is a simple and efficient expense tracker that helps users manage their finances effortlessly. 
              It allows tracking expenses while providing a seamless and user-friendly experience.
            </p>
          </div>

          {/* About Me Section */}
          <div className="p-6 rounded-2xl bg-white shadow-lg mb-6">
            <h2 className="text-2xl font-bold  text-heading-color">About Me</h2>
            <p className="mt-2 text-lg">
              I'm <span className="font-bold">Akash Vyas</span>, software developer with a strong focus on web technologies. 
              Currently pursuing my B.Sc. in IT, I love tackling projects that push me to grow and expand my skill set. 
              I'm dedicated to becoming a top programmer and eventually building a business that solves real-world problems.
            </p>
          </div>
  
          {/* Favorite Projects Section */}
          <div className="p-6 rounded-2xl bg-white shadow-lg mb-6">
            <h2 className="text-2xl font-bold text-heading-color">My Favorite Projects</h2>
            <ul className="mt-4 space-y-3 text-lg">
              <li>🌐 <a href="https://mvcreation.co.in" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Portfolio-For-graphicDesigner(website)</a> - A portfolio website for a graphic designer using HTML and CSS.</li>
              <li>💻 <a href="https://javascript-projects-navy.vercel.app/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Javascript-Projects(website)</a> - JavaScript projects covering beginner to advanced levels.</li>
              <li>🔥 <a href="https://github.com/AVISHEREE/30-Days-js-challenge" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">30-Days-js-challenge(code)</a> - Master JavaScript through hands-on projects in 30 days.</li>
              <li>🛒 <a href="https://github.com/AVISHEREE/Product-sells" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Product-sells(code)</a> - An e-commerce platform built with React, Node.js, and MongoDB.</li>
              <li>🎥 <a href="https://github.com/AVISHEREE/backend-on-youtube" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">backend-on-youtube(code)</a> - A repository for practicing backend skills inspired by YouTube tutorials.</li>
            </ul>
          </div>
  
          {/* GitHub Stats */}
          <div className="p-6 rounded-2xl bg-white shadow-lg mb-6">
            <h2 className="text-2xl font-bold text-heading-color">📈 GitHub Stats</h2>
            <img 
              src="https://github-readme-stats.vercel.app/api?username=AVISHEREE&show_icons=true&theme=radical" 
              alt="GitHub Stats" 
              className="mt-4 rounded-lg"
            />
          </div>
  
          {/* Contact Section */}
          <div className="p-6 bg-white rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-heading-color">📫 How to Reach Me</h2>
            <div className="mt-4">
              <a 
                href="https://wa.me/7888082956" 
                className="flex items-center gap-2 text-lg text-heading-color hover:text-blue-600"
                target="_blank" 
                rel="noopener noreferrer"
              >
                📱 WhatsApp: +91 788808XXXX
              </a>
              <a 
                href="https://www.linkedin.com/in/akash-vyas-880914290/" 
                className="flex items-center gap-2 text-lg text-heading-color hover:text-blue-600 mt-2"
                target="_blank" 
                rel="noopener noreferrer"
              >
                🔗 LinkedIn: linkedin.com/in/akash-vyas-880914290/
              </a>
              <a 
                href="https://github.com/AVISHEREE" 
                className="flex items-center gap-2 text-lg text-heading-color hover:text-blue-600 mt-2"
                target="_blank" 
                rel="noopener noreferrer"
              >
                🧑‍💻 Github: github.com/AVISHEREE
              </a>
              <p className="mt-2 text-lg">📧 Email: <span className="font-bold">akashvyas2006@gmail.com</span>, <span className="font-bold">vyassakash3@gmail.com</span></p>
            </div>
          </div>
        </div>
      </div>
      </>
    );
  }
  