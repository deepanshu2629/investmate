import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen font-[Poppins]">
      {/* Navigation */}
      <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center fixed w-full top-0 z-50">
        <div className="text-2xl font-bold text-blue-600">Investmate</div>
        <div className="flex gap-6">
          <Link
            href="/startup/login"
            className="text-gray-700 font-medium hover:text-blue-600 transition-colors"
          >
            Login as Startup
          </Link>
          <Link
            href="/investor/login"
            className="text-gray-700 font-medium hover:text-blue-600 transition-colors"
          >
            Login as Investor
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header
        className="h-screen flex flex-col items-center justify-center text-center relative bg-cover bg-center text-white"
        style={{
          backgroundImage:
            "url('https://media.istockphoto.com/id/1503371245/photo/percentage-sign-on-top-of-coin-stacks-before-blue-financial-graph.jpg?b=1&s=612x612&w=0&k=20&c=7A_2QwhEcxkciMxlpLL22UXAUbEIUE2nrdVTrWgsrbM=')",
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">InvestMate</h1>
          <p className="text-xl mb-8 drop-shadow-md">
            Connecting Startups with Investors
          </p>
          <Link
            href="/startup/register"
            className="px-8 py-3 bg-[#0d1a26] text-white rounded-md text-lg hover:bg-[#1e2f40] transition-colors"
          >
            Apply for Funding
          </Link>
        </div>
      </header>

      {/* Scrolling Text */}
      <div className="bg-white py-4 border-y-2 border-gray-300 overflow-hidden">
        <div className="animate-scroll whitespace-nowrap text-[#0d1a26] text-lg">
          🚀 Transforming Ideas into Reality | 🤝 Join Hands with Visionary
          Investors | 🌐 India&apos;s Fastest Growing Startup Network | 💡
          Innovation Starts Here | 💰 Funding Opportunities | 📈 Scale Your
          Business | 🎯 Pitch. Connect. Grow. | 📞 Get in Touch Today!
        </div>
      </div>

      {/* For Startups Section */}
      <section
        className="min-h-screen bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://media.istockphoto.com/id/1200038382/photo/start-up-business-of-creative-people-concept.jpg?b=1&s=612x612&w=0&k=20&c=wT2Kwr3EZRVT4fvpP7LQvqMaFyWk8nvtca125CWBU3Y=')",
        }}
      >
        <div className="text-center text-white drop-shadow-lg p-8">
          <h2 className="text-4xl font-bold mb-4">For Startups</h2>
          <p className="text-xl mb-6 max-w-2xl">
            Looking for funding? Pitch your startup to our network of active
            investors and mentors.
          </p>
          <Link
            href="/startup/register"
            className="px-8 py-3 bg-[#0d1a26] text-white rounded-md text-lg hover:bg-[#1e2f40] transition-colors"
          >
            Apply Now
          </Link>
        </div>
      </section>

      {/* For Investors Section */}
      <section
        className="min-h-screen bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://media.istockphoto.com/id/1311598658/photo/businessman-trading-online-stock-market-on-teblet-screen-digital-investment-concept.jpg?b=1&s=612x612&w=0&k=20&c=bpQMsH07ziELXla0SZJt84-w0JkxsVXs05c7T2Iygks=')",
        }}
      >
        <div className="text-center text-white drop-shadow-lg p-8">
          <h2 className="text-4xl font-bold mb-4">For Investors</h2>
          <p className="text-xl mb-6 max-w-2xl">
            Discover high-growth opportunities and innovative solutions from
            emerging founders. Access complete pitch decks, due diligence data,
            and more — all in one place.
          </p>
          <Link
            href="/investor/register"
            className="px-8 py-3 bg-[#0d1a26] text-white rounded-md text-lg hover:bg-[#1e2f40] transition-colors"
          >
            Join as Investor
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-8 bg-gradient-to-r from-cyan-100 to-purple-200 text-center">
        <h2 className="text-4xl font-bold mb-6 text-gray-800">About Us</h2>
        <p className="text-lg max-w-4xl mx-auto text-gray-700">
          At <strong>Startup Connect</strong>, we bridge the gap between
          emerging startups and strategic investors. Our platform enables
          early-stage ventures to showcase their innovation, connect with
          potential backers, and accelerate their growth journey. For investors,
          we offer a curated pipeline of high-potential startups across diverse
          sectors.
        </p>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-8 bg-gradient-to-r from-purple-200 to-cyan-100 text-center">
        <h2 className="text-4xl font-bold mb-8 text-gray-800">Why Choose Us</h2>
        <ul className="max-w-3xl mx-auto text-left space-y-4 text-gray-700">
          <li className="flex items-start gap-3">
            <span className="text-blue-600 font-bold">•</span>
            <span>
              <strong>Curated Startups:</strong> Only high-quality,
              investor-ready businesses
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 font-bold">•</span>
            <span>
              <strong>Verified Founders:</strong> Background-checked and
              pitch-ready
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 font-bold">•</span>
            <span>
              <strong>Insightful Analytics:</strong> Real-time performance and
              growth indicators
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 font-bold">•</span>
            <span>
              <strong>Global Investor Network:</strong> Connect beyond borders
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 font-bold">•</span>
            <span>
              <strong>Personalized Support:</strong> From pitch decks to funding
              rounds
            </span>
          </li>
        </ul>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 bg-gray-100 text-gray-600">
        &copy; 2026 Startup Connect. All rights reserved.
      </footer>
    </div>
  );
}
