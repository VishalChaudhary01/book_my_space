

export default function RoomDetails({ params }: { params: { id: string } }) {
     return (
          <div>
               Room details : {params.id}
          </div>
     )
}