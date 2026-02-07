import { redirect } from "next/navigation";

/** صفحه فروشگاه حذف شده؛ هدایت به خدمات */
export default function ShopPage() {
  redirect("/services");
}
