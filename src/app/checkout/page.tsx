import { getAssetFiles, getAssetFolder, ASSET_KEYS } from "@/lib/assets";
import { CheckoutClient } from "./CheckoutClient";

export default function CheckoutPage() {
  const trustImages = {
    revenue: getAssetFiles(ASSET_KEYS.revenue)[0],
    buttons: getAssetFiles(ASSET_KEYS.buttons)[0],
    textMessages: getAssetFiles(ASSET_KEYS.textReviews)[0],
  };
  const trustFolders = {
    revenue: getAssetFolder(ASSET_KEYS.revenue),
    buttons: getAssetFolder(ASSET_KEYS.buttons),
    textMessages: getAssetFolder(ASSET_KEYS.textReviews),
  };
  return <CheckoutClient trustImages={trustImages} trustFolders={trustFolders} />;
}
