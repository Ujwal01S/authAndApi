import Demo from "@/components/shopTable/demoTable";
import ShopTable from "@/components/shopTable/shopTable";
import { shopApi } from "@/services/api";
import React from "react";

async function getShopData() {
  const shopData = await shopApi.getShopData();

  if (!shopData || shopData.res.error) {
    throw new Error("Failed to fetch data");
  }

  return shopData.res.data;
}

export default async function ShopDetailPage() {
  const shopData = await getShopData();
  return (
    <div className="w-full py-4 px-2 flex justify-center">
      {Array.isArray(shopData) && <ShopTable shops={shopData} />}

      {/* <Demo /> */}
    </div>
  );
}
