import { Breadcrumbs } from "@/components/ui/breadcrumb";
import { getPropertyById } from "@/data/properties";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EditPropertyForm from "./edit-property-form";

export default async function page({ params }: { params: Promise<any> }) {
  const paramsValue = await params;
  const property = await getPropertyById(paramsValue.propertyId);

  return (
    <div>
      <Breadcrumbs
        items={[
          {
            href: "/admin-dashboard",
            label: "Dashboard",
          },
          {
            label: "Edit Property",
          },
        ]}
      />
      <Card className="mt-5">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Edit Property</CardTitle>
        </CardHeader>
        <CardContent>
          <EditPropertyForm
            id={property.id}
            address1={property.address1}
            address2={property.address2}
            city={property.city}
            postcode={property.postcode}
            bathrooms={property.bathrooms}
            bedrooms={property.bedrooms}
            price={property.price}
            description={property.description}
            status={property.status}
          />
        </CardContent>
      </Card>
    </div>
  );
}
