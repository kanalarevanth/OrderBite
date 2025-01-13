import { Card, Col } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";

const RecipeSkeleton: React.FC = () => {
  return (
    <Col xs={12} sm={6} md={4} lg={3} xl={2} className="mb-4">
      <Card className="skeleton-card">
        <Skeleton height={200} width="100%" />
        <Card.Body>
          <Skeleton width="80%" />
          <Skeleton count={3} />
          <Skeleton width="50%" />
        </Card.Body>
      </Card>
    </Col>
  );
};

export default RecipeSkeleton;
