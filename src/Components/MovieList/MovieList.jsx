import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { categories, getGenreListMovie, getGenreName } from "./api";
import { useNavigate } from "react-router-dom";

const Tab = styled.div`
  display: flex;
  gap: 5px;
  margin: 10px 0;
`;
export const Button = styled.button`
  width: 130px;
  height: 40px;
  background-color: dodgerblue;
  border: none;
  border-radius: 4px;
  color: white;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: #ff69b4;
  }
  &.selected {
    background-color: #32cd32;
  }
`;
export const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
`;
export const Card = styled.div`
  width: 100%;
  border: 1px solid dodgerblue;
  cursor: pointer;
  padding: 10px;
`;
export const Img = styled.img`
  width: 100%;
`;
export const Text = styled.div`
  color: #333;
  overflow-wrap: break-word;
  word-break: break-all;
`;

function MovieList() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCat, setSelectedCat] = useState(0);
  const [genreList, setGenreList] = useState([]);
  const IMG_PATH = "https://image.tmdb.org/t/p/original";
  const navigate = useNavigate(); // url 수정함수수

  useEffect(() => {
    getMovies(0);
  }, []);

  // 1. await는 반드시 async함수안에 사용한다.
  // 2. try~catch구문을 이용하는 것이 좋다.
  async function getMovies(index) {
    try {
      // 장르리스트가 상태에 없을 경우 처리
      if (genreList.length === 0) {
        const storedGenreList = JSON.parse(sessionStorage.getItem("GenreList"));
        if (storedGenreList && storedGenreList.length > 0) {
          // 세션스토리지에 값이 있으면 상태 업데이트
          console.log("세션스토리지에 값이 있음");
          setGenreList(storedGenreList);
        } else {
          // 세션스토리지에도 없으면 API 호출
          console.log("세션스토리지에도 없어서 API 호출");
          const response = await getGenreListMovie(); // 200 OK
          setGenreList(response.data.genres);
          sessionStorage.setItem(
            "GenreList",
            JSON.stringify(response.data.genres)
          );
        }
      }

      // 무비리스트 요청
      let response = await categories[index].func(); // 200 OK
      console.log(response.data);
      setSelectedCat(index);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error); // 400, 404, 500 기타등등
      alert("네트워크 오류로 정상적인 동작이 안되고 있습니다");
    }
  }

  return (
    <div>
      <h1>MovieList</h1>
      <Tab>
        {categories.map((category, i) => (
          <Button
            key={i}
            onClick={() => getMovies(i)}
            className={i == selectedCat ? "selected" : ""}
          >
            {category.category}
          </Button>
        ))}
      </Tab>
      <Container>
        {loading ? (
          <p>로딩중...</p>
        ) : (
          data.results.map((movie) => (
            <Card key={movie.id} onClick={() => navigate(`${movie.id}`)}>
              <Img src={IMG_PATH + movie.poster_path}></Img>
              <Text>타이틀 : {movie.title}</Text>
              <Text>장르 : {getGenreName(genreList, movie.genre_ids)}</Text>
              <hr />
              <Text>{movie.overview}</Text>
            </Card>
          ))
        )}
      </Container>
    </div>
  );
}

export default MovieList;
