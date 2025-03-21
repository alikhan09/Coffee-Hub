import React from "react";

const Contact = () => {
  return (
    <div
      className="relative bg-cover bg-center min-h-screen flex flex-col justify-center items-center text-white px-6"
      style={{ backgroundImage: "url('/assets/cappuccino.jpeg')" }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative text-center max-w-3xl bg-gray-900 bg-opacity-80 p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-yellow-400 mb-4 drop-shadow-lg">
          Get in Touch ☕
        </h1>
        <p className="text-lg text-gray-300 mb-6 leading-relaxed">
          Have a question or want to place an order? Reach out to us—we’d love to hear from you!
        </p>

        {/* Contact Details */}
        <div className="space-y-4 text-lg">
          <p>📍 <strong>Location:</strong> **123 Food Street, Gulberg, Lahore, Pakistan** , Pakistan**</p>
          <p>📞 <strong>Phone:</strong> <a href="tel:+923123456789" className="text-yellow-300 hover:underline">+92 312 3456789</a></p>
          <p>📧 <strong>Email:</strong> <a href="mailto:contact@coffeehub.com" className="text-yellow-300 hover:underline">contact@coffeehub.com</a></p>
        </div>

        {/* Contact Form */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📝 Send Us a Message</h2>
          <form className="space-y-4">
            <input type="text" placeholder="Your Name" className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
            <input type="email" placeholder="Your Email" className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
            <textarea placeholder="Your Message" className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 h-32"></textarea>
            <button className="w-full bg-yellow-500 text-gray-900 font-semibold px-4 py-2 mt-2 rounded-lg shadow-lg hover:bg-yellow-600 transition">
              📩 Send Message
            </button>
          </form>
        </div>

        <div className="mt-6">
  <h2 className="text-2xl font-semibold text-yellow-400 mb-2">📍 Find Us on Map</h2>
  <iframe
    className="w-full h-64 rounded-lg shadow-lg"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6806.524765107635!2d74.35255621736683!3d31.520369434490906!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919056ac7b4f1b1%3A0x53a0a1b8855d83df!2sGulberg%2C%20Lahore%2C%20Pakistan!5e0!3m2!1sen!2sus!4v1712400000000"
    allowFullScreen
    loading="lazy"
  ></iframe>
</div>
      </div>
    </div>
  );
};

export default Contact;
