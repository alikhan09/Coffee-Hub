// FullCareerReport_FullWordReplica.jsx
// Fully reproduces the uploaded Report.docx word-for-word into a styled HTML layout,
// then captures each page using html2canvas and compiles into a jsPDF (pixel-perfect).
//
// Install dependencies:
// npm install jspdf html2canvas highcharts highcharts-react-official
//
// Usage:
// Import and render <FullCareerReport /> in your React app. Click "Download Report" to generate PDF.
//
// Note:
// - This implementation builds each Word page as a styled HTML <div class="report-page">.
// - Because the PDF pages will be images, styling (fonts/colors) is preserved exactly as in HTML.
// - If fonts used in the Word doc are not available in the browser, results may differ slightly.
// - Replace any placeholder values with dynamic data as needed.

import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import front from "../assets/front.png";
import header from "../assets/Header.png";
import footer from "../assets/Footer.png";
import { FaStar } from "react-icons/fa";
import Speedometer from "./speedometer";

const FullCareerReport = () => {
  const pagesRef = useRef(null);
  const chartRef = useRef(null);
  const iqData = [
    {
      range: "130 and above",
      label: "Very Superior",
      value: 130,
      color: "#6a0dad",
    }, // Purple
    { range: "120–129", label: "Superior", value: 125, color: "#1e3a8a" }, // Dark Blue
    { range: "110–119", label: "High Average", value: 115, color: "#16a34a" }, // Green
    { range: "90–109", label: "Average", value: 100, color: "#facc15" }, // Yellow
    { range: "80–89", label: "Low Average", value: 85, color: "#f97316" }, // Orange
    { range: "70–79", label: "Borderline", value: 75, color: "#dc2626" }, // Red
    { range: "Below 70", label: "Extremely Low", value: 65, color: "#4b5563" }, // Gray
  ];

  // ====== Student / Report Data (as in Report.docx) ======
  const student = {
    name: "FATIMA ALMAS KHAN",
    fatherName: "Yousuf Almas",
    testId: "123456",
    city: "ISLAMABAD",
    testDate: "September 25, 2025",
    phone: "0333-57 66 716 & 051-8318333",
    phone2: "051-8318333",
    email: "eduvisionpakistan@gmail.com",
    website: "www.eduvision.edu.pk",
    iqScore: 103,
    iqRangeText: "Very Superior",
    intelligenceScores: {
      IQ: 103,
      EQ: 13,
      SQ: 70,
      TQ: 90,
      CQ: 75,
    },
    footerId: "130119",
  };
  const data = [
    {
      title: "Technical Intelligence (TQ)",
      description:
        "Technical Intelligence refers to the ability to understand, apply, and work effectively with technology, tools, systems, or specialized technical knowledge. It involves problem-solving skills in technical areas and the capacity to learn and adapt to new technologies.",
      value: student.intelligenceScores.TQ,
    },
    {
      title: "Social Intelligence (SQ)",
      description:
        "Social Intelligence is the ability to understand, manage, and navigate social situations effectively. It involves being aware of your own emotions and the emotions of others, communicating well, and building positive relationships.",
      value: student.intelligenceScores.SQ,
    },
    {
      title: "Cultural Intelligence (CQ)",
      description:
        "Cultural Intelligence is the ability to understand, respect, and effectively interact with people from different cultural backgrounds, making it essential for global learning and leadership.",
      value: student.intelligenceScores.CQ,
    },
    {
      title: "Creative Intelligence (CQ)",
      description:
        "Creative Intelligence is the ability to come up with new, original ideas and solutions by thinking in imaginative and innovative ways. It goes beyond just being artistic, it’s about solving problems, adapting to change, and generating novel approaches in various contexts.",
      value: student.intelligenceScores.CQ,
    },
  ];
  // ====== Highcharts options for Intelligence Spectrum (will be rendered on a page) ======
  const intelligenceOptions = {
    chart: {
      type: "column",
      backgroundColor: "transparent",
      height: 260,
    },
    title: { text: "Intelligence Spectrum" },
    xAxis: { categories: Object.keys(student.intelligenceScores) },
    yAxis: { min: 0, max: 140, title: { text: "Score" } },
    series: [
      {
        name: "Score",
        data: Object.values(student.intelligenceScores),
        colorByPoint: true,
      },
    ],
    credits: { enabled: false },
    legend: { enabled: false },
  };

  // ====== Helper to capture pages and make PDF ======
  const generatePDF = async () => {
    const doc = new jsPDF("p", "mm", "a4");
    const pages = pagesRef.current.querySelectorAll(".report-page");
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Render each page to canvas and add to PDF
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];

      // Temporarily remove focus outlines etc.
      const canvas = await html2canvas(page, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });

      const imgData = canvas.toDataURL("image/png");
      doc.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight);

      if (i < pages.length - 1) doc.addPage();
    }

    doc.save(`${student.name}_Career_Planning_Report.pdf`);
  };

  // ====== Styles inline to ensure html2canvas captures them consistently ======
  const pageStyle = {
    width: "794px", // A4 at 96dpi approx width
    height: "1122px", // A4 height
    margin: "0 auto",
    boxSizing: "border-box",
    background: "#ffffff",
    color: "#0f172a",
    fontFamily: "Arial, Helvetica, sans-serif",
    padding: "36px", // ~14mm margin
    position: "relative",
    overflow: "hidden",
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "4px solid #1e3a8a", // deep blue strip like Word theme
    paddingBottom: "8px",
    marginBottom: "12px",
  };

  const sectionTitleStyle = {
    background: "#1e40af", // blue header
    color: "#fff",
    padding: "8px 12px",
    display: "inline-block",
    borderRadius: "4px",
    marginTop: "6px",
    marginBottom: "12px",
  };

  const footerStyle = {
    position: "absolute",
    bottom: "18px",
    left: "36px",
    right: "36px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "11px",
    color: "#475569",
    borderTop: "1px dashed #e2e8f0",
    paddingTop: "8px",
  };

  // ====== The full report pages (word-for-word: major paragraphs & labels) ======
  // Note: To keep readability, long paragraphs are written exactly as plain strings.
  return (
    <div className="p-4">
      <h2 style={{ fontFamily: "Arial", marginBottom: 12 }}>
        Full Career Planning Report — Word Replica
      </h2>

      <div ref={pagesRef}>
        {/* ----------------------- Page 1: Cover ----------------------- */}
        <div className="report-page relative w-[794px] h-[1122px] mx-auto bg-[#ffffff] overflow-hidden">
          {/* Full background image */}
          <img
            src={front}
            alt="Cover"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />

          {/* Centered Student Info Box */}
          <div className="relative flex justify-center mt-[380px] z-10">
            <div className="border-2 border-[#000000] rounded-lg bg-[#ffffff] px-10 py-6 text-center min-w-[350px]">
              <div className="text-[22px] font-bold text-[#000000]">
                {student.name}
              </div>
              <div className="mt-3 text-sm">
                Father Name: {student.fatherName}
              </div>
              <div className="mt-1 text-sm">Test ID: {student.testId}</div>
              <div className="mt-1 text-sm">{student.city}</div>
              <div className="mt-1 text-sm">Test Date: {student.testDate}</div>
            </div>
          </div>
        </div>

        {/* ----------------------- Page 2: Message from the CEO ----------------------- */}
        <div className="report-page relative w-[794px] h-[1122px] mx-auto bg-[#ffffff] overflow-hidden">
          {/* Header image */}
          <img
            src={header}
            alt="Header"
            className="absolute top-0 left-0 w-full h-[110px] object-cover z-0"
          />

          {/* Page content */}
          <div className="mt-[140px] text-[14px] leading-[1.5] text-justify px-20 z-10">
            <div className="my-8 text-center font-bold text-xl text-[#1e3a8a]">
              Message from the CEO
            </div>

            <p className="font-bold mb-3">Congratulations!</p>
            <p className="mb-3">
              You’ve taken a big and important step toward discovering your true
              potential. Every career is valuable, but not every career is the
              right fit for everyone. When you choose a path that aligns with
              your interests, strengths, and values, and pursue it with
              dedication and focus, you not only move toward success but also
              find meaning and joy in your work.
            </p>

            <p className="mb-3">
              We, as a nation, are blessed with immense intellectual potential
              and the boundless talent of youth like you. This potential is more
              than a personal gift, it’s a national asset. When individuals like
              you make informed, thoughtful career choices, the ripple effect
              strengthens not just your own future, but the future of our
              communities and our country.
            </p>

            <p className="mb-3">
              This assessment is just the beginning. Use these insights to
              reflect, explore, and take confident steps forward. And remember,
              we’re here to guide you along the way.
            </p>

            <p>
              Wishing you clarity, courage, and success in your journey ahead.
            </p>

            <div className="mt-5">
              <div className="font-bold">Warm regards,</div>
              <div className="mt-2 font-bold">Yousuf Almas</div>
              <div className="my-8 text-center font-bold text-xl text-[#1e3a8a]">
                All the Best for your Career Journey!
              </div>
            </div>
          </div>

          {/* Footer image */}
          <img
            src={footer}
            alt="Footer"
            className="absolute bottom-0 left-0 w-full h-[102px] object-cover z-0"
          />

          {/* Overlay footer text */}
          <div className="absolute bottom-8 right-0 -translate-x-1/2 text-[14px] font-bold text-[#000000] z-50 bg-[#ffffff]">
            {student.name} | {student.testId}
          </div>
        </div>

        {/* ----------------------- Page 3: Dear ... / Intro ----------------------- */}
        <div className="report-page relative w-[794px] h-[1122px] mx-auto bg-[#ffffff] overflow-hidden">
          {/* Header image */}
          <img
            src={header}
            alt="Header"
            className="absolute top-0 left-0 w-full h-[110px] object-cover z-0"
          />

          {/* Page content */}
          <div className="mt-[150px] text-[14px] leading-[1.5] text-justify px-20">
            <div className="mb-4 text-left font-bold text-xl text-[#1e3a8a]">
              DEAR {student.name},
            </div>

            <p className="font-bold text-center text-[16px]">
              Welcome to Your Career Planning Report!
            </p>

            <p className="mt-2">
              This report is a comprehensive analysis of your aptitude,
              combining insights into your personality, strengths, values,
              abilities, preferences, and much more. It has been created to help
              you make better academic and career decisions based on who you
              are, not just what you score.
            </p>

            <p className="mt-2">
              The findings in this report are based on your responses in the
              Psychometric Aptitude Assessment. Each section highlights a
              different aspect of your profile to give you a well-rounded
              understanding of your potential and the environments where you're
              most likely to thrive.
            </p>

            <h4 className="my-4 text-left font-bold text-xl text-[#1e3a8a]">
              WHAT IS APTITUDE?
            </h4>

            <p className="mt-2">
              Aptitude is your natural fitness and suitability or potential for
              a particular career or profession. It's not just about
              intelligence; it's about the whole you.
            </p>

            <p className="mt-2">
              Your aptitude profile includes the following key components:
            </p>

            <ul className="list-disc font-bold ml-6 mt-2">
              <li>Your Personality Traits</li>
              <li>Top Strengths</li>
              <li>Your Abilities</li>
              <li>Your Values</li>
              <li>Your Ideal Workplace Compatibility</li>
              <li>Your Interpersonal & Soft Skills</li>
              <li>Your Decision Making Style</li>
              <li>Intelligence Spectrum</li>
              <li>Top Career Recommendations for You</li>
              <li>A Special Advice For You</li>
              <li>Test Type: Psychometric Aptitude Assessment</li>
            </ul>

            {/* Student Information Table */}
            <div className="mt-12 px-8">
              <table className="w-full border-t border-b border-[#f97316] text-[13px]">
                <thead>
                  <tr className="font-bold text-left">
                    <th className="py-2 px-3 border-b border-[#f97316]">
                      Test Type
                    </th>
                    <th className="py-2 px-3 border-b border-[#f97316]">
                      Psychometric Aptitude Assessment
                    </th>
                    <th className="py-2 px-3 border-b border-[#f97316]">
                      Test Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-[#ffedd5]">
                    <td className="py-2 px-3">Name</td>
                    <td className="py-2 px-3">{student.name}</td>
                    <td className="py-2 px-3">Class: {student.class}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3">Father Name</td>
                    <td className="py-2 px-3">{student.fatherName}</td>
                    <td className="py-2 px-3">Group: {student.group}</td>
                  </tr>
                  <tr className="bg-[#ffedd5]">
                    <td className="py-2 px-3">Email</td>
                    <td className="py-2 px-3">{student.email}</td>
                    <td className="py-2 px-3">Phone: {student.phone}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3">Institution</td>
                    <td className="py-2 px-3">{student.institution}</td>
                    <td className="py-2 px-3">City: {student.city}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer image */}
          <img
            src={footer}
            alt="Footer"
            className="absolute bottom-0 left-0 w-full h-[102px] object-cover z-0"
          />

          {/* Overlay footer text */}
          <div className="absolute bottom-8 right-0 -translate-x-1/2 text-[14px] font-bold text-[#000000] z-50 bg-[#ffffff]">
            {student.name} | {student.testId}
          </div>
        </div>

        {/* ----------------------- Page 4: Personality Traits & Strengths ----------------------- */}
        <div className="report-page relative w-[794px] h-[1122px] mx-auto bg-[#ffffff] overflow-hidden">
          {/* Header image */}
          <img
            src={header}
            alt="Header"
            className="absolute top-0 left-0 w-full h-[110px] object-cover z-0"
          />

          {/* Page content */}
          <div className="mt-[150px] text-[14px] leading-[1.5] text-justify px-20">
            <div className="mb-4 text-left font-bold text-xl text-[#1e3a8a]">
              YOUR PERSONALITY TRAITS
            </div>
            <div className="text-[18px] font-bold  mb-2 italic text-[#000000]">
              Understanding yourself is the first step toward success.
            </div>

            <p>
              Personality is the foundation of your aptitude. It reflects your
              natural way of thinking, behaving, and interacting with others.
              Knowing your personality helps identify the work environments and
              tasks where you will thrive.
            </p>

            <p className="mt-2 font-bold">
              Here are your key personality traits from Career Planning
              Perspective:
            </p>

            <ul className="list-disc ml-6  mt-2 space-y-1">
              <li>
                You motivate and inspire your peers to achieve their best,
                creating a supportive work environment.
              </li>
              <li>
                You are skilled at crafting engaging narratives that bring your
                ideas to life.
              </li>
              <li>
                Due to the open-mindedness, you tend not to judge others' ideas
                or perspectives.
              </li>
              <li>
                You are happy to work independently and are unafraid of
                exploring the personal freedom that comes with working in
                solitude.
              </li>
              <li>
                You accept challenges and try your best to solve the abstract
                problems.
              </li>
              <li>
                Your ability to assess situations and identify potential risks
                makes you a reliable team member.
              </li>
            </ul>

            <h4 className="my-6 text-[20px]  text-center font-bold">
              Here are your top strengths
            </h4>

            <div className="mt-2 bg-[#fed7aa] grid grid-cols-2 p-12 text-center space-y-4">
              <div className="flex flex-col items-center text-center p-4  ">
                <FaStar className="text-[#F97316] text-3xl mb-2" />
                <div className="font-bold">Adaptability</div>
                <div className="mt-1 text-sm text-[#4B5563]">
                  (You quickly adjust to new situations and challenges.)
                </div>
              </div>

              {/* Strength 2 */}
              <div className="flex flex-col items-center text-center p-4  ">
                <FaStar className="text-[#F97316] text-3xl mb-2" />
                <div className="font-bold">Leadership</div>
                <div className="mt-1 text-sm text-[#4B5563]">
                  (You inspire others and take initiative in teams.)
                </div>
              </div>

              {/* Strength 3 */}
              <div className="flex flex-col items-center text-center p-4  ">
                <FaStar className="text-[#F97316] text-3xl mb-2" />
                <div className="font-bold">Creativity</div>
                <div className="mt-1 text-sm text-[#4B5563]">
                  (You think outside the box and bring innovative solutions.)
                </div>
              </div>

              {/* Strength 4 */}
              <div className="flex flex-col items-center text-center p-4  ">
                <FaStar className="text-[#F97316] text-3xl mb-2" />
                <div className="font-bold">Problem Solving</div>
                <div className="mt-1 text-sm text-[#4B5563]">
                  (You analyze problems carefully and find effective solutions.)
                </div>
              </div>
            </div>
          </div>

          {/* Footer image */}
          <img
            src={footer}
            alt="Footer"
            className="absolute bottom-0 left-0 w-full h-[102px] object-cover z-0"
          />

          {/* Overlay footer text */}
          <div className="absolute bottom-8 right-0 -translate-x-1/2 text-[14px] font-bold text-[#000000] z-50 bg-[#ffffff]">
            {student.name} | {student.testId}
          </div>
        </div>

        {/* ----------------------- Page 5: Abilities (multiple blocks) ----------------------- */}
        <div className="report-page" style={pageStyle}>
          <div style={headerStyle}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#1e3a8a" }}>
              YOUR ABILITIES
            </div>
            <div style={{ fontSize: 12, color: "#64748b" }}>
              Abilities are the tools in your success toolkit.
            </div>
          </div>

          <div
            style={{
              marginTop: 12,
              fontSize: 12,
              lineHeight: 1.5,
              textAlign: "justify",
            }}
          >
            <p>
              Second component of aptitude is ability. Abilities are the
              talent—mental or physical—that you naturally excel at. Identifying
              and building on these will help you succeed academically and
              professionally. Here are your stronger areas in abilities.
            </p>

            <div style={{ marginTop: 12 }}>
              <div style={{ fontWeight: 700 }}>Your 2nd best ability is</div>
              <div style={{ fontWeight: 700, marginTop: 4 }}>
                Analytical Ability
              </div>
              <div style={{ marginTop: 6 }}>
                You excel at following step-by-step instructions, such as
                assembling furniture or handling any procedural task without
                confusion. Your ability to prepare a meal by strictly following
                a recipe reflects a natural inclination towards structured
                processes. Additionally, you are remarkably skilled at tackling
                puzzles or logical challenges by systematically working through
                each step.
              </div>
            </div>

            <div style={{ marginTop: 16 }}>
              <div style={{ fontWeight: 700 }}>Your Strongest ability is</div>
              <div style={{ fontWeight: 700, marginTop: 4 }}>
                Analytical Ability
              </div>
              <div style={{ marginTop: 6 }}>
                You excel at following step-by-step instructions, such as
                assembling furniture or handling any procedural task without
                confusion. Your ability to prepare a meal by strictly following
                a recipe reflects a natural inclination towards structured
                processes. Additionally, you are remarkably skilled at tackling
                puzzles or logical challenges by systematically working through
                each step.
              </div>
            </div>

            <div style={{ marginTop: 16 }}>
              <div style={{ fontWeight: 700 }}>Your 3rd best ability is</div>
              <div style={{ fontWeight: 700, marginTop: 4 }}>
                Analytical Ability
              </div>
              <div style={{ marginTop: 6 }}>
                You excel at following step-by-step instructions, such as
                assembling furniture or handling any procedural task without
                confusion. Your ability to prepare a meal by strictly following
                a recipe reflects a natural inclination towards structured
                processes. Additionally, you are remarkably skilled at tackling
                puzzles or logical challenges by systematically working through
                each step.
              </div>
            </div>

            <div style={{ marginTop: 18, fontWeight: 700 }}>
              Improve your Abilities
            </div>
            <div style={{ marginTop: 8 }}>
              <div>
                💡 Explore free tools like SketchUp or Tinkercad once a week.
                Start by building basic models like a table or house.
              </div>
              <div style={{ marginTop: 6 }}>
                💡 Join treasure hunts using maps or play sports like football
                and badminton that improve real-time spatial awareness.
              </div>
            </div>
          </div>

          <div style={footerStyle}>
            <div>Eduvision Counselling Centre</div>
            <div>Page 5</div>
          </div>
        </div>

        {/* ----------------------- Page 6: Values & Workplace Compatibility ----------------------- */}
        <div className="report-page" style={pageStyle}>
          <div style={headerStyle}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#1e3a8a" }}>
              YOUR VALUES
            </div>
            <div style={{ fontSize: 12, color: "#64748b" }}>
              What matters most to you should guide your path.
            </div>
          </div>

          <div style={{ marginTop: 12, fontSize: 12, lineHeight: 1.5 }}>
            <p>
              Values are the third most important component of aptitude. Values
              influence how you’ll feel satisfied in a career. They shape your
              priorities, your sense of purpose, and how you interact with
              others.
            </p>

            <p style={{ marginTop: 8 }}>
              You should prefer a work environment that:
            </p>

            <ul style={{ marginLeft: 18, marginTop: 8 }}>
              <li>
                Encourages innovation, fresh ideas, and freedom to experiment
              </li>
              <li>
                Encourages innovation, fresh ideas, and freedom to experiment
              </li>
              <li>
                Encourages innovation, fresh ideas, and freedom to experiment
              </li>
              <li>
                Encourages innovation, fresh ideas, and freedom to experiment
              </li>
              <li>
                Encourages innovation, fresh ideas, and freedom to experiment
              </li>
              <li>
                Encourages innovation, fresh ideas, and freedom to experiment
              </li>
            </ul>

            <div style={{ marginTop: 12 }}>
              <div style={{ fontWeight: 700 }}>
                YOUR IDEAL WORKPLACE COMPATIBILITY
              </div>
              <div style={{ marginTop: 8 }}>
                Where your strengths meet the right setting for success.
              </div>

              <p style={{ marginTop: 8 }}>
                Every individual has a natural inclination toward certain types
                of work environments or tasks, what we call their preferred
                nature of work. There are eight broad areas that represent
                different ways of working, and most people are naturally drawn
                to one or two of them. These areas are where individuals tend to
                feel most engaged and perform at their best. It’s important to
                note that this is not the same as choosing a career. Two people
                in the same profession or career may thrive in completely
                different work environments; one may prefer structure and
                organization, while another excels in creative and expressive
                settings.
              </p>
            </div>

            <div style={{ marginTop: 12 }}>
              <div style={{ fontWeight: 700 }}>
                You are most likely to excel in workplace setting that involves
                you in:
              </div>
              <div style={{ marginTop: 8 }}>Language & Communication</div>
              <div style={{ marginTop: 6 }}>Hands-On & Physical Work</div>
            </div>
          </div>

          <div style={footerStyle}>
            <div>Eduvision Counselling Centre</div>
            <div>Page 6</div>
          </div>
        </div>

        {/* ----------------------- Page 7: Interpersonal & Decision Making ----------------------- */}
        <div className="report-page" style={pageStyle}>
          <div style={headerStyle}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#1e3a8a" }}>
              YOUR INTERPERSONAL & SOFT SKILLS
            </div>
            <div style={{ fontSize: 12, color: "#64748b" }}>
              The abilities that shape how you think, act, and connect with
              others.
            </div>
          </div>

          <div style={{ marginTop: 12, fontSize: 12, lineHeight: 1.5 }}>
            <p>
              Interpersonal and soft skills represent how well you connect,
              communicate, and collaborate with others.
            </p>

            <div style={{ marginTop: 8 }}>
              <div style={{ fontWeight: 700 }}>
                Your top Interpersonal and soft skills are
              </div>
              <ul style={{ marginLeft: 18, marginTop: 8 }}>
                <li>Skill 1</li>
                <li>Skill 2</li>
                <li>Skill 3</li>
              </ul>
            </div>

            <div style={{ marginTop: 12 }}>
              <div style={{ fontWeight: 700 }}>YOUR DECISION MAKING STYLE</div>
              <p style={{ marginTop: 6 }}>
                You tend to make decisions in a [rational / emotional /
                balanced] way. This means you generally rely more on [logic and
                objective analysis / feelings and intuition / a mix of logic and
                emotion] when evaluating options and making choices.
                Understanding your natural style can help you recognize its
                strengths and be mindful of potential blind spots, especially in
                high-stakes or complex situations.
              </p>
            </div>
          </div>

          <div style={footerStyle}>
            <div>Eduvision Counselling Centre</div>
            <div>Page 7</div>
          </div>
        </div>

        {/* ----------------------- Page 8: Intelligence Spectrum (chart) ----------------------- */}
        <div className="report-page relative w-[794px] h-[1122px] mx-auto bg-[#ffffff] overflow-hidden">
          {/* Header image */}
          <img
            src={header}
            alt="Header"
            className="absolute top-0 left-0 w-full h-[110px] object-cover z-0"
          />

          {/* Page content */}
          <div className="mt-[150px] text-[14px] leading-[1.5] text-justify px-20">
            <div className="mb-4 text-left font-bold text-2xl text-[#1e3a8a]">
              INTELLIGENCE SPECTRUM
            </div>

            <p className=" text-[14px] mb-2">
              Intelligence in practical life goes far beyond just academic
              brilliance. This report gives you a snapshot of your complete
              intelligence profile.
            </p>
            <div className="my-8 mx-18 border border-1 text-center p-8">
              <p className="font-semibold text-3xl ">Your IQ score is </p>
              <p className="font-bold text-4xl ">
                {student.intelligenceScores.IQ}
              </p>
              <p className="text-[18px] ">
                (You are in the range: Very Superior)
              </p>
            </div>
            <p className=" text-[14px] mb-2">
              Scoring method based on the WAIS (Wechsler Adult Intelligence
              Scale) framework.
            </p>
            <div className="p-6 bg-[#ffffff] shadow-md rounded-lg space-y-4">
              <h2 className="text-xl font-bold mb-4">
                IQ Range Classification
              </h2>
              {iqData.map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm font-medium mb-1">
                    <span>{item.range}</span>
                    <span>{item.label}</span>
                  </div>
                  <div className="w-full bg-[#E5E7EB] rounded-full h-4">
                    <div
                      className="h-4 rounded-full"
                      style={{
                        width: `${(item.value / 130) * 100}%`,
                        backgroundColor: item.color,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer image */}
          <img
            src={footer}
            alt="Footer"
            className="absolute bottom-0 left-0 w-full h-[102px] object-cover z-0"
          />

          {/* Overlay footer text */}
          <div className="absolute bottom-8 right-0 -translate-x-1/2 text-[14px] font-bold text-[#000000] z-50 bg-[#ffffff]">
            {student.name} | {student.testId}
          </div>
        </div>

        {/* ----------------------- Page 9: EQ/SQ/TQ/CQ Descriptions ----------------------- */}
        <div className="report-page relative w-[794px] h-[1122px] mx-auto bg-[#ffffff] overflow-hidden">
          {/* Header image */}
          <img
            src={header}
            alt="Header"
            className="absolute top-0 left-0 w-full h-[110px] object-cover z-0"
          />

          {/* Page content */}
          <div className="mt-[120px] text-[14px] leading-[1.5] text-justify px-20">
            <div className="mb-4 text-left font-bold text-2xl text-[#1e3a8a]">
              Emotional Intelligence (EQ)
            </div>

            <p className=" text-[14px] mb-2">
              Emotional Intelligence (EQ) is the ability to recognize,
              understand, manage, and use your own emotions effectively, as well
              as to recognize and influence the emotions of others.
            </p>
            <div className="my-8 mx-18 border border-1 text-center p-8">
              <p className="font-semibold text-3xl ">Your EQ score is </p>
              <p className="font-bold text-4xl ">
                {student.intelligenceScores.EQ}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-1">
              {data.map((item, idx) => (
                <Speedometer
                  key={idx}
                  title={item.title}
                  description={item.description}
                  value={item.value}
                />
              ))}
            </div>
          </div>

          {/* Footer image */}
          <img
            src={footer}
            alt="Footer"
            className="absolute bottom-0 left-0 w-full h-[102px] object-cover z-0"
          />

          {/* Overlay footer text */}
          <div className="absolute bottom-8 right-0 -translate-x-1/2 text-[14px] font-bold text-[#000000] z-50 bg-[#ffffff]">
            {student.name} | {student.testId}
          </div>
        </div>

        {/* ----------------------- Page 10: Top Career Recommendations & Advice ----------------------- */}
        <div className="report-page" style={pageStyle}>
          <div style={headerStyle}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#1e3a8a" }}>
              TOP CAREER RECOMMENDATIONS FOR YOU!
            </div>
            <div style={{ fontSize: 12, color: "#64748b" }}>
              Based on your profile, the following careers are excellent matches
              for you.
            </div>
          </div>

          <div style={{ marginTop: 12, fontSize: 12, lineHeight: 1.5 }}>
            <p>Counselor’s Special advice:</p>
            <p>
              You may need academic improvement in some areas. With focus and
              planning, these goals are very achievable.
            </p>

            <div style={{ marginTop: 12, fontWeight: 700 }}>
              add to my priority… Career Planner is currently under
              construction. Stay connected!
            </div>

            <div style={{ marginTop: 16 }}>
              <div style={{ fontWeight: 700 }}>Success Formula</div>
              <div style={{ marginTop: 8 }}>
                Remember: A goal without a plan is just a wish. Plan wisely.
                Manage your time. Focus on your goals with courage and
                commitment. These careers suit you well, but they’ll only lead
                to success if you meet their basic requirements.
              </div>
            </div>
          </div>

          <div style={footerStyle}>
            <div>Eduvision Counselling Centre</div>
            <div>Page 10</div>
          </div>
        </div>

        {/* ----------------------- Page 11: Counselling CTA & Milestones ----------------------- */}

        <div className="report-page relative w-[794px] h-[1122px] mx-auto bg-[#ffffff] overflow-hidden">
          {/* Header image */}
          <img
            src={header}
            alt="Header"
            className="absolute top-0 left-0 w-full h-[110px] object-cover z-0"
          />

          {/* Page content */}
          <div className="mt-[150px] text-[14px] leading-[1.5] text-justify px-20">
            <div className="mb-4 text-left font-bold text-2xl text-[#1e3a8a]">
              WANT TO DISCUSS YOUR CAREER PLAN WITH THE COUNSELOR?
            </div>

            <p className=" text-[14px] mb-2">
              Schedule your counselling session with our career counselor now
              to:
            </p>
            <ul className="list-disc ml-6  mt-2 space-y-1">
              <li>Plan your next academic and career move</li>
              <li>Understand your strengths and growth areas in depth</li>
              <li>Explore suitable fields, courses, and pathways</li>
              <li>Get answers to any questions from your assessment</li>
              <li>Build a personalized action plan for your future</li>
            </ul>
            <p className=" text-[14px] font-bold my-4">
              You can take the session:{" "}
              <span className="font-normal">In-person / Online </span>
            </p>

            <div className="my-8 text-left font-bold text-2xl text-[#1e3a8a]">
              YOUR NEXT COUNSELLING MILESTONES
            </div>
            <p className=" text-[14px] font-semibold  mb-4">
              Here are four key stages in life when it's important to meet the
              counselor and reassess your career planning:
            </p>
            <ol className="list-decimal ml-6 mt-2 space-y-1">
              <li>Choosing your major or specialization</li>
              <li>Entering university or a professional path</li>
              <li>Adjusting to academic or workplace life</li>
              <li>Planning for growth or advanced studies</li>
            </ol>
          </div>

          {/* Footer image */}
          <img
            src={footer}
            alt="Footer"
            className="absolute bottom-0 left-0 w-full h-[102px] object-cover z-0"
          />

          {/* Overlay footer text */}
          <div className="absolute bottom-8 right-0 -translate-x-1/2 text-[14px] font-bold text-[#000000] z-50 bg-[#ffffff]">
            {student.name} | {student.testId}
          </div>
        </div>

        {/* ----------------------- Page 12: Contact Us & Final Note (Urdu) ----------------------- */}

        <div className="report-page relative w-[794px] h-[1122px] mx-auto bg-[#ffffff] overflow-hidden">
          {/* Header image */}
          <img
            src={header}
            alt="Header"
            className="absolute top-0 left-0 w-full h-[110px] object-cover z-0"
          />

          {/* Page content */}
          <div className="mt-[150px] text-[14px] leading-[1.5] text-justify px-20">
            <div className="mb-4 text-left font-bold text-2xl text-[#1e3a8a]">
              CONTACT US
            </div>

            <p className=" text-[14px] mb-2">
              Eduvision Counselling Centre, Islamabad, Pakistan
            </p>
            <p className=" text-[14px] mb-2">
              Counselling Appointments: 0333-57 66 716 & 051-8318333 (10:00 am -
              6:00 pm)
            </p>
            <p className=" text-[14px] mb-2">
              Email: eduvisionpakistan@gmail.com
            </p>
            <p className=" text-[14px] mb-2">
              Website: www.eduvision.edu.pk May your journey be guided with
              purpose, and may your hard work open doors to a bright, fulfilling
              future.
            </p>
            <div className="my-8 text-left font-bold text-2xl text-[#1e3a8a]">
              FINAL NOTE <span className="mx-16 ">آخری بات</span>
            </div>
            <p className=" text-xl font-semibold text-center mb-4">
              ہم آپ کے بہتر مستقبل کے لیے دعاگو ہیں۔
            </p>
            <p className=" text-[14px] mb-2">
              May your journey be guided with purpose, and may your hard work
              open doors to a bright, fulfilling future.
            </p>
          </div>

          {/* Footer image */}
          <img
            src={footer}
            alt="Footer"
            className="absolute bottom-0 left-0 w-full h-[102px] object-cover z-0"
          />

          {/* Overlay footer text */}
          <div className="absolute bottom-8 right-0 -translate-x-1/2 text-[14px] font-bold text-[#000000] z-50 bg-[#ffffff]">
            {student.name} | {student.testId}
          </div>
        </div>
      </div>

      {/* ===== Buttons ===== */}
      <div style={{ marginTop: 18 }}>
        <button
          onClick={generatePDF}
          style={{
            background: "#1d4ed8",
            color: "#fff",
            border: "none",
            padding: "10px 16px",
            borderRadius: 6,
            cursor: "pointer",
            fontWeight: 700,
          }}
        >
          Download Report (Full Word Replica)
        </button>
      </div>

      <div style={{ marginTop: 10, fontSize: 12, color: "#64748b" }}>
        Tip: The rendered PDF is pixel-perfect (each page is an image). If you
        need selectable text or smaller file sizes, consider rebuilding the
        layout using jsPDF drawing methods (tradeoff: more manual styling).
      </div>
    </div>
  );
};

export default FullCareerReport;
