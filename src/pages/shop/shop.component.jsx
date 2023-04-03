import React from "react";
import { Routes, Route, useParams } from "react-router-dom";

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";

const ShopPage = () => {
    return (
    <div className="shop-page">
        <Routes>
            <Route path='' element={<CollectionsOverview />} />
            <Route path=':collectionId' element={<CollectionPage params={useParams()} />} />
        </Routes>
    </div>
)};

export default ShopPage; 
