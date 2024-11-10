import styled from "styled-components";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;
//  플로팅 버튼 스타일

const Header = styled.h2`
  font-family: "S-Core_Dream", sans-serif;
  text-align: center;
  color: #333;
`;

const FormSection = styled.div`
  background-color: #fafafa;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  resize: none;
`;

const Button = styled.button`
  padding: 5px 10px;
  font-size: 16px;
  color: white;
  background-color: #555;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }

  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 14px;
  margin-bottom: 10px;

  input[type="checkbox"] {
    appearance: none;
    width: 16px;
    height: 16px;
    border: 1px solid #777;
    border-radius: 3px;
    margin-right: 8px;
    cursor: pointer;
    display: inline-block;
    position: relative;

    &:checked {
      background-color: #777;
      border-color: #777;
    }

    &:checked::after {
      content: "✓";
      color: white;
      font-size: 12px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

const PostContainer = styled.div`
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const PostHeader = styled.h3`
  color: #333;
  margin: 0;
`;

const PostContent = styled.p`
  color: #555;
`;

const AdminComment = styled.p`
  color: #555;
  font-weight: bold;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`;

const PageButton = styled.button`
  background-color: ${(props) => (props.active ? "#333" : "#eee")};
  color: ${(props) => (props.active ? "white" : "#333")};
  border: none;
  padding: 8px 12px;
  margin: 0 4px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.active ? "#333" : "#ccc")};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export {
  CheckboxLabel,
  Container,
  Header,
  FormSection,
  Input,
  TextArea,
  Button,
  PostContainer,
  PostHeader,
  PostContent,
  AdminComment,
  PaginationContainer,
  PageButton,
};
