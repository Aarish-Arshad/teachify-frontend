import React from 'react';
import { Upload, Typography } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import '../styles/MainSectionQuiz.css';

const { Dragger } = Upload;
const { Text } = Typography;

const FileUploader = ({ fileName, setFileName, setSelectedFile }) => {
  const uploadProps = {
    name: 'file',
    multiple: false,
    accept: '.pdf,.docx,.txt',
    beforeUpload(file) {
      setFileName(file.name);
      setSelectedFile(file);  // pass file to MainSection
      return false; // Prevent auto-upload
    },
    onRemove() {
      setFileName(null);
      setSelectedFile(null);
    }
  };

  return (
    <Dragger {...uploadProps} className="upload-box">
      <p className="ant-upload-drag-icon">
        <InboxOutlined className="upload-icon" />
      </p>
      <p className="ant-upload-text">
        Drag & drop or <Text strong>click to</Text> upload PDF, DOCX, TXT
      </p>
      {fileName && (
        <p className="selected-file">
          Selected File: <strong>{fileName}</strong>
        </p>
      )}
    </Dragger>
  );
};

export default FileUploader;
