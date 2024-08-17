export default function _timeTodate(datetime) {
  const month = String(datetime.getMonth() + 1).padStart(2, "0");
  const date = String(datetime.getDate()).padStart(2, "0");
  const hour = String(datetime.getHours()).padStart(2, "0");
  const minute = String(datetime.getMinutes()).padStart(2, "0");
  return `${month}월 ${date}일 ${hour}시 ${minute}분`;
}
