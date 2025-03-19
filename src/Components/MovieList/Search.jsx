import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "./MovieList";
import { Container } from "./MovieList";
import { Card } from "./MovieList";
import { Img } from "./MovieList";
import { Text } from "./MovieList";
import { useNavigate } from "react-router-dom";
import { IMG_PATH, searchMoviesByKeyword } from "./api";

const SearchBox = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;
const Input = styled.input`
  width: 500px;
  height: 40px;
`;
const H3 = styled.h3`
  margin-bottom: 20px;
`;

function Search() {
  const [keyword, setKeyword] = useState("");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  function handleChange(value) {
    setKeyword(value);
  }

  async function searchMovies() {
    if (!keyword) {
      alert("검색어를 입력해주세요.");
      return;
    }
    try {
      let response = await searchMoviesByKeyword(keyword);
      console.log(response.data);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      alert("네트워크 오류로 정상적인 동작이 안되고 있습니다");
    }
  }

  return (
    <div>
      <SearchBox>
        <Input
          type="text"
          value={keyword}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="검색어를 입력해주세요"
        />
        <Button onClick={searchMovies}>검색</Button>
      </SearchBox>
      <H3>{keyword ? `${keyword}로 검색한 결과 리스트` : null}</H3>
      <Container>
        {loading
          ? "대기중..."
          : data.results.map((movie) => (
              <Card
                key={movie.id}
                onClick={() => navigate(`/movie/${movie.id}`)}
              >
                <Img src={IMG_PATH + movie.poster_path}></Img>
                <Text>타이틀 : {movie.title}</Text>
                <Text>장르 :</Text>
                <hr />
                <Text>{movie.overview}</Text>
              </Card>
            ))}
      </Container>
    </div>
  );
}

export default Search;
