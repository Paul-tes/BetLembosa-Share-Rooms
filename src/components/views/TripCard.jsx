import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";

import { removeTripApi } from "@/lib/host";

import { useAppStore } from "@/store/store";

import { useRouter } from "next/navigation";

export default function TripCard({data}) {

  const { removeTrip } = useAppStore();
  
  const router = useRouter();

  const  isUpcomming = ()=> {
    const currentDate = new Date();
    const providedDate = new Date(data.endDate);
    if (providedDate < currentDate) {
      return false;
    } else if (providedDate > currentDate) {
      return true;
    }
  }

  const deleteTrip = () => {
    // update from the state
    const result = removeTripApi(data.id);
  }



  return (
    <Card className="w-full max-w-[80vw] flex-row mb-8">
      <CardHeader
        shadow={false}
        floated={false}
        className="m-0 w-2/5 shrink-0 rounded-r-none"
      >
        <img
          src={data.photo}
          alt="card-image"
          className="h-full w-full object-cover"
        />

        <Button color="red">Delete Trip</Button>
      </CardHeader>
      <CardBody>
        <div className="mb-4 flex items-center justify-between">
          {
            isUpcomming() == true ? 
            <Button disabled color="green">UpComming</Button>
            : <Button disabled variant="gradient">Passed</Button>
          }

          <Button onClick={deleteTrip} color="red">Delete Trip</Button>
        </div>

        <Typography variant="h4" color="blue-gray" className="mb-4 mt-4">
          {data.hostName}
        </Typography>
        <Typography variant="h6" color="gray" className="mb-1 uppercase">
          {data.startDate}
        </Typography>
        <Typography variant="h6" color="blue" className="">
          Up to
        </Typography>
        <Typography variant="h6" color="gray" className="mb-4 uppercase">
          {data.endDate}
        </Typography>
        Payement
        {
          data.paid == true ? <button disabled className="btn btn-outline btn-success ml-2"> Completed</button>
          : <button disabled className="btn btn-outline ml-2"> Not Complated</button>
        }

        <Button variant="text"
          className="flex items-center gap-2 mt-4"
          onClick={() => router.push(`/homes/${data.id}`)}
        >
          Host Detail
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </Button>
      </CardBody>
    </Card>
  )
}