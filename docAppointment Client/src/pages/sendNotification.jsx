// NotificationScreen.js
import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";

const NotificationScreen = () => {
  const [notification, setNotification] = useState("");
  const [recipientOptions] = useState([
    { value: "1", label: "All User" },
    { value: "2", label: "All Salons" },
  
  ]);
      const [typeOption] = useState([
    { value: "1", label: "general" },
          { value: "2", label: "booking" },
    { value: "3", label: "order" },
          { value: "4", label: "assistance" },
    { value: "5", label:  "reminder" },
    
    
  
  ]);
    const [selectedRecipient, setSelectedRecipient] = useState(recipientOptions[0]); // Set the default recipient
      const [typeOptions, settypeOption] = useState(typeOption[0]); // Set the default recipient


  const sendNotification = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/notifications/add`,
        {
          message: notification,
          notificationType: "info", // Set the desired notification type
          metaData: {}, // Add any additional metadata as needed
        }
      );

      if (response.status === 201) {
        console.log('Notification sent successfully:', response.data);
        // Optionally, you can clear the input fields or perform other actions upon success
        setNotification("");
      } else {
        console.error('Failed to send notification:', response.data);
      }
    } catch (error) {
      console.error('Error sending notification:', error.message);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Send Notification</h2>
      <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
        <div className="mb-4">
          <label htmlFor="recipient" className="block text-sm font-medium text-gray-600">
            Recipient:
          </label>
          <Select
            id="recipient"
            value={selectedRecipient}
            onChange={(selectedOption) => setSelectedRecipient(selectedOption)}
            options={recipientOptions}
                  />
                   <div className="mb-4">
          <label htmlFor="recipient" className="block text-sm font-medium text-gray-600 pt-4 pb-2">
            Type:
          </label>
                  
                    <Select
            id="recipient"
            value={typeOptions}
            onChange={(selectedOption) => settypeOption(selectedOption)}
            options={typeOption}
                      />
                      </div>
        </div>
        <div className="mb-4">
          <label htmlFor="notification" className="block text-sm font-medium text-gray-600">
            Notification Message:
          </label>
          <textarea
            id="notification"
            name="notification"
            value={notification}
            onChange={(e) => setNotification(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <button
          onClick={sendNotification}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Send Notification
        </button>
      </div>
    </div>
  );
};

export default NotificationScreen;
