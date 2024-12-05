import styled from "styled-components";

const Container = styled.div`
  width: 400px;
  height: 900px;
  position: relative;
  margin: 50px 50px;
  display: flex;
  justify-content: center;
`;

const EmojiSelector = styled.div`
  position: absolute;
  width: 98%;
  height: 200px;
  box-sizing: border-box;
  flex-wrap: wrap;
  bottom: 0px;
  display: flex;
  gap: 10px;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  background: rgba(255, 255, 255, 0.9);
  padding: 10px;
`;

const Message = styled.div`
  position: absolute;
  height: 200px;
  box-sizing: border-box;
  z-index: 99;
  width: 98%;
  bottom: 0px;
  text-align: center;
  font-size: 18px;
  color: #333;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  background: rgba(255, 255, 255, 0.9);
  padding: 80px;
`;

const InputContainer = styled.div`
  position: absolute;
  width: 98%;
  height: 200px;
  box-sizing: border-box;
  bottom: 0px;
  background: rgba(255, 255, 255, 0.9);
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const PhotoSelectionContainer = styled.div`
  position: absolute;
  width: 98%;
  height: 200px;
  box-sizing: border-box;
  bottom: 0px;
  background: rgba(255, 255, 255, 0.95);
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  display: flex;
  justify-content: space-around; /* 버튼을 양옆으로 배치 */
  align-items: center;
  z-index: 100;
`;

const EmojiButton = styled.div`
  font-size: 45px;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }
`;

const InputField = styled.textarea`
  width: 90%;
  height: 60px;
  font-size: 16px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 10px;
  resize: none;
`;

const PhotoUploadButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background: #2196f3;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background: #1e88e5;
  }
`;

const CancelButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background: #f44336;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background: #e53935;
  }
`;

const PhotoPreview = styled.img`
  width: 100%;
  max-height: 100px;
  object-fit: cover;
  border-radius: 10px;
  margin-top: 10px;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background: #45a049;
  }
`;

const Balloon = styled.div`
  position: relative;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.7);
  transform: translate(-50%, calc(-100% - 60px));
  max-width: 200px; /* 최대 폭 */
  min-width: 50px; /* 최소 폭 */
  display: inline-block; /* 내용에 따라 크기 조정 */
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export {
  Container,
  EmojiSelector,
  Message,
  InputContainer,
  PhotoSelectionContainer,
  EmojiButton,
  InputField,
  PhotoUploadButton,
  CancelButton,
  PhotoPreview,
  SubmitButton,
  Balloon,
};
