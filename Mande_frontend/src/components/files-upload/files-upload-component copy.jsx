import React, { Component } from 'react';

export default class FilesUploadComponent extends Component {
    render() {
        return (
            <div className="container text-white">
                <div className="row">
                        <div className="form-group">
                            <input type="file"/>
                        </div>
                </div>
            </div>
        )
    }
}