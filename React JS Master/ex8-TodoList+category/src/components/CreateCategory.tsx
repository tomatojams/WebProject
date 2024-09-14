import { useForm } from "react-hook-form";
import { useAddCategory, categoryListState } from "./atoms";
import { ICategory } from "../types/ICategory";
import { useRecoilValue } from "recoil";
// 챌린지 추가

// useForm 자체가 입력값을 객체로 관리함
// 입력하면 등록한 'Category'는 필드로 지정하게 됨.
export default function CreateTodo() {
  const {
    register, // 등록
    handleSubmit, // submit 후 처리
    formState: { errors },
    setValue, // 입력폼 지우기
  } = useForm<ICategory>({});

  const categoryList = useRecoilValue(categoryListState);
  const addCategory = useAddCategory();
  const _onValid = ({ Category }: ICategory) => {
    addCategory(Category);
    setValue("Category", ""); // 유효할때 입력창초기화
  };

  console.log(categoryList);
  return (
    <form onSubmit={handleSubmit(_onValid)}>
      <input
        id="comment_input_category"
        {...register("Category", {
          required: "새 카테고리를 추가해주세요",
          validate: {
            noCool: (value) => (value?.includes("cool") ? "No cool allowed" : true),
          },
          minLength: {
            value: 1,
            message: "새 카테고리를 추가해주세요.",
          },
        })}
        type="text"
        placeholder="새로운 카테고리"
      />
      <button className="simplebutton-log">Add</button>

      <span>{errors?.Category?.message}</span>
    </form>
  );
}
