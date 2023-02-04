import React, { Component } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import "./files-upload-component.css";

export default class FilesUploadComponent extends Component {
  render() {
    return (
      <div className="container text-white">
        <div className="row">
          <div className="form-group">
            <label className="label">
              <input type="file" required />
              <span>Select a file</span>
            </label>
          </div>
        </div>
      </div>
    );
  }
}
