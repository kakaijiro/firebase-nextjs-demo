import PropertyStatusBadge from "@/components/property-status-badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUserFavourites } from "@/data/favourites";
import { getPropertiesById } from "@/data/properties";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import RemoveFavouriteButton from "./remove-favourite-button";
import { redirect } from "next/navigation";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<any>;
}) {
  const searchParamsValue = await searchParams;
  const page = searchParamsValue?.page ? parseInt(searchParamsValue.page) : 1;

  const pageSize = 2;
  const favourites = await getUserFavourites();
  const allFavourites = Object.keys(favourites);
  const totalPages = Math.ceil(allFavourites.length / pageSize);

  const paginatedFavourites = allFavourites.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  // if the page was not existed.
  if (!paginatedFavourites.length && page > 1) {
    redirect(`/account/my-favourites?page=${totalPages}`);
  }

  const properties = await getPropertiesById(paginatedFavourites);

  console.log({ paginatedFavourites, properties });

  return (
    <div className="max-w-screen-lg mx-auto">
      <h1 className="text-4xl font-bold py-4 mt-5">My Properties</h1>
      {!paginatedFavourites.length && (
        <h2 className="text-center text-zinc-400 text-3xl font-bold py-10">
          You have no favourited property.
        </h2>
      )}
      {!!paginatedFavourites.length && (
        <Table className="mt-4">
          <TableHeader>
            <TableRow>
              <TableHead>Property</TableHead>
              <TableHead>Status</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedFavourites.map((favourite) => {
              const property = properties.find(
                (property) => property.id === favourite
              );
              const address = [
                property?.address1,
                property?.address2,
                property?.city,
                property?.postcode,
              ]
                .filter((addressLine) => !!addressLine)
                .join(", ");
              return (
                <TableRow key={favourite}>
                  <TableCell>{address}</TableCell>
                  <TableCell>
                    {!!property?.status && (
                      <PropertyStatusBadge status={property?.status} />
                    )}
                  </TableCell>
                  <TableCell className="flex justify-end items-center gap-1">
                    {!!property && (
                      <>
                        <Button asChild variant="outline">
                          <Link href={`/property/${property.id}`}>
                            <EyeIcon />
                          </Link>
                        </Button>
                        <RemoveFavouriteButton propertyId={property.id} />
                      </>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>
                {Array.from({ length: totalPages }).map((_, index) => {
                  return (
                    <Button
                      disabled={page === index + 1}
                      key={index}
                      asChild={page !== index + 1}
                      variant="outline"
                      className="mx-1"
                    >
                      <Link href={`/account/my-favourites?page=${index + 1}`}>
                        {index + 1}
                      </Link>
                    </Button>
                  );
                })}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </div>
  );
}
