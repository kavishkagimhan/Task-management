import React from 'react';

const About = () => {
  return (
    <div className="w-full h-auto py-16 bg-gray-100">
      <div className="max-w-[1200px] mx-auto text-center p-4">
        <h2 className="mb-4 text-3xl font-bold text-primary">About Us</h2>
        <p className="text-lg leading-relaxed text-gray-700">
          Welcome to TaskMaster, your ultimate tool for efficient task management and seamless collaboration. Our mission is to help individuals and teams achieve their goals by providing a platform that organizes tasks, enhances productivity, and fosters real-time communication.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-gray-700">
          At TaskMaster, we believe that effective task management is the key to success in both personal and professional life. Our app is designed with a user-friendly interface, smart notifications, and secure user accounts, ensuring that you stay on top of your tasks while safeguarding your data.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-gray-700">
          Whether you're managing personal to-dos or collaborating with a team, TaskMaster adapts to your workflow, making task management simple, intuitive, and powerful. Join us on the journey to better productivity and let TaskMaster be your partner in success.
        </p>
      </div>
    </div>
  );
}

export default About;
