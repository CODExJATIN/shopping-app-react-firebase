import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {doc,getDoc} from 'firebase/firestore';
import { db } from '../firebaseConfig';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import {useNavigate} from 'react-router-dom';


const Navbar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [userName, setUserName] = useState('');
    const [isMenuClicked, setIsMenuClicked]=useState(false);

    function toggleMenu(){
        setIsMenuClicked(!isMenuClicked);
    }

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                const userRef = doc(db, 'users', user.uid);
                getDoc(userRef).then((docSnap) => {
                    if (docSnap.exists()) {
                        const fullName = docSnap.data().fullName;
                        setUserName(fullName.split(' ')[0]);
                    }
                });
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);
   

    return (
        <div className='navbar'>
            <div className='menu-icon'>
                <MenuIcon onClick={toggleMenu}/>
            </div>

            <div className={isMenuClicked? 'hamburger-menu visible show':'hamburger-menu'}>
                <div className='close-icon'>
                    <CloseIcon onClick={toggleMenu}/>
                </div>
                <div className='menu-list'>

                <div className='option visible'>
                    <div className='option-icon'>
                         <PersonOutlineOutlinedIcon/>
                    </div>
                    <div className='option-name'>
                        {user ? (
                            <>
                                <div>
                                    Welcome, {userName || "User"}
                                </div>
                                <div>
                                    <strong>My Account</strong>
                                </div>
                                <div>
                                    <div>Account Details</div>
                                    <div>Order History</div>
                                    <div onClick={() => getAuth().signOut()}>Logout</div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div>Sign In</div>
                                <div><strong>Account</strong></div>
                                <div>
                                    <div onClick={navigate('/get-started')}>Login/SignUp</div>
                                    <div onClick={navigate('/get-started')}>Shipping History</div>
                                    <div onClick={navigate('/get-started')}>Walmart+</div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className='option visible'>
                    <div className='option-icon'>
                         <FavoriteBorderIcon/>
                    </div>
                    <div className='option-name'>

                        <div>
                            <strong>
                                My Items
                            </strong>
                        </div>
                    </div>
                    <div>
                        <div>Reorder</div>
                        <div>Lists</div>
                        <div>Registries</div>
                    </div>
                </div>

                
                </div>
            </div>
            <div className='logo-icon'>
                BallCart
            </div>

            <div className='search-bar'>
                <input type="text" placeholder="Search Everything online on our shopping platform" className="search-bar" />
                <SearchIcon className="search-icon" />
            </div>

            <div className='option-list'>
                <div className='option'>
                    <div className='option-icon'>
                         <FavoriteBorderIcon/>
                    </div>
                    <div className='option-name'>
                        <div>
                            Reorder
                        </div>
                        <div>
                            <strong>
                                My Items
                            </strong>
                        </div>
                    </div>
                    <div className='dropdown-menu'>
                        <div>Reorder</div>
                        <div>Lists</div>
                        <div>Registries</div>
                    </div>
                </div>

                <div className='option'>
                    <div className='option-icon'>
                         <PersonOutlineOutlinedIcon/>
                    </div>
                    <div className='option-name'>
                        {user ? (
                            <>
                                <div>
                                    Welcome, {userName || "User"}
                                </div>
                                <div>
                                    <strong>My Account</strong>
                                </div>
                                <div className='dropdown-menu'>
                                    <div>Account Details</div>
                                    <div>Order History</div>
                                    <div onClick={() => getAuth().signOut()}>Logout</div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div>Sign In</div>
                                <div><strong>Account</strong></div>
                                <div className='dropdown-menu'>
                                    <div onClick={navigate('/get-started')}>Login/SignUp</div>
                                    <div onClick={navigate('/get-started')}>Shipping History</div>
                                    <div onClick={navigate('/get-started')}>Walmart+</div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className='cart-button'>
                    <ShoppingCartOutlinedIcon/>
                    <div>$0.00</div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;
