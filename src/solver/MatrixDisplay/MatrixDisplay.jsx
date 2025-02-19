import React from "react";
import "./MatrixDisplay.css";

const MatrixDisplay = ({ matrix, augmented = false }) => {
  return (
    <div className="matrix-container">
      <table className="matrix-table">
        <tbody>
          {matrix.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td
                  key={colIndex}
                  className={`matrix-cell ${augmented && colIndex === row.length - 1 ? 'augmented-border' : ''}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MatrixDisplay;
