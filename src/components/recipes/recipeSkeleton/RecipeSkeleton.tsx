import React from "react";
import { Card, Col } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import "./RecipeSkeleton.css";

const RecipeSkeleton: React.FC = () => {
  return (
    <Col
      xs={12}
      sm={6}
      md={4}
      lg={3}
      xl={2}
      className="mb-4 recipe-skeleton-col"
    >
      <Card className="recipe-skeleton-card w-100">
        <Skeleton height={200} />
        <Card.Body>
          <Skeleton width="100%" />
          <Skeleton count={3} />
          <Skeleton width="80%" />
        </Card.Body>
      </Card>
    </Col>
  );
};

export default RecipeSkeleton;
