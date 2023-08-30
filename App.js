// Import necessary dependencies
import React, { useState } from 'react';
import { jsPDF } from 'jspdf'; // Importing jsPDF library for PDF generation
import 'jspdf-autotable'; // Importing the autotable plugin for jsPDF
import './App.css'; 

// Define the main App component

function App() {

  // State to store the input text and generated PDF data

  const [text, setText] = useState('');
  const [pdfData, setPdfData] = useState(null);

  // Function to generate PDF from input text
  
  const generatePDF = () => {
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Add the input text to the PDF document at (10, 10) position
    doc.text(text, 10, 10);

    // Generate a Blob from the PDF document and create a URL for it
    
    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);

    // Update the state with the PDF URL
    setPdfData(pdfUrl);
  };

  // Function to share PDF on WhatsApp
  const sharePDFOnWhatsApp = () => {
    if (pdfData) {
      // Create a share URL for WhatsApp with the PDF URL as text
      const shareUrl = `whatsapp://send?text=Check out this PDF: ${encodeURIComponent(pdfData)}`;
      // Open the URL, which triggers the WhatsApp share
      window.location.href = shareUrl;
    }
  };

  // Render the components
  return (
    <div className='container'>
      {/* Input textarea */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={10}
        cols={50}
        placeholder='enter your text'
      />

      {/* Button to generate PDF */}
      <button onClick={generatePDF} style={{ backgroundColor: ' #D62A21' }}>
        Generate PDF
      </button>

      {/* Button to share PDF on WhatsApp */}
      <button onClick={sharePDFOnWhatsApp} style={{ backgroundColor: '#3DE34F' }}>
        Share PDF on WhatsApp
      </button>

      {/* If PDF data is available, display the PDF preview */}
      {pdfData && <iframe title="pdfPreview" src={pdfData} width="100%" height="500px" />}
    </div>
  );
}

// Export the App component
export default App;
