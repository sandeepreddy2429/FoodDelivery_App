import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProductsCard from "../components/cards/ProductsCard";
import { getFavourite } from "../api"; // Ensure this function is correctly defined in your API module
import { CircularProgress } from "@mui/material";

const Container = styled.div`
  padding: 20px 30px;
  padding-bottom: 200px;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  @media (max-width: 768px) {
    padding: 20px 12px;
  }
  background: ${({ theme }) => theme.bg};
`;

const Section = styled.div`
  max-width: 1400px;
  padding: 32px 16px;
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: 500;
  display: flex;
  justify-content: ${({ center }) => (center ? "center" : "space-between")};
  align-items: center;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  justify-content: center;
  @media (max-width: 760px) {
    gap: 16px;
  }
`;

const Favourites = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null); // Add error state

  const getProducts = async () => {
    setLoading(true);
    setError(null); // Reset error state before making the request
    const token = localStorage.getItem("krist-app-token");

    try {
      const res = await getFavourite(token);
      setProducts(res.data);
    } catch (err) {
      setError("Failed to load favorites."); // Set error message
      console.error(err); // Log error for debugging
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Container>
      <Section>
        <Title>Your Favourites</Title>
        <CardWrapper>
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <div>{error}</div> // Display error message if exists
          ) : (
            products.map((product) => (
              <ProductsCard key={product._id} product={product} /> // Add key prop
            ))
          )}
        </CardWrapper>
      </Section>
    </Container>
  );
};

export default Favourites;
