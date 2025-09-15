import { useState,useEffect } from "react";

type Props = {
    userId: number;
}

const UserProfile: React.FC<Props> =({userId})=>{

    const [user, setUser] = useState<any>(null);

    useEffect(()=>{
        fetch(`https://api.example.com/user/${userId}`)
            .then(response => response.json())
            .then(data => setUser(data))
            .catch(error => console.error('Error fetching data:', error))
    }
        
    ,[]);

    return(
        <div>
            {user?(
                <div>
                    <h1>{user.name}</h1>
                    <p>{user.bio}</p>
                </div>
            ):(
                <p>Loading...</p>
            )
            }
        </div>
        
    );

};
export default UserProfile;