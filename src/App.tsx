import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"

import emailjs from 'emailjs-com';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { db, collection, getDocs } from './firebaseConfig';
import { query, where, updateDoc, doc } from 'firebase/firestore';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import TableComp from './pages/TableComponent'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"



function App() {
  const [count, setCount] = useState(0)
  const [showForm, setShowForm] = useState(false)
  const [fullName, setFullName] = useState("John Doe");
  const [passportNumber, setPassportNumber] = useState("123456789");
  const [nationality, setNationality] = useState("American");
  const [dateOfBirth, setDateOfBirth] = useState("01/01/2000");
  const [travelDate, setTravelDate] = useState("01/06/2024");
  const [returnDate, setReturnDate] = useState("01/07/2024");
  const [contactNumber, setContactNumber] = useState("123-456-7890");
  const [email, setEmail] = useState("john.doe@example.com");
  const [purpose, setPurpose] = useState('');
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('');
  const [accommodation, setAccommodation] = useState('');
  const [history, setHistory] = useState('');
  const [requests, setRequests] = useState<any[]>([]);
  const [tableVals, setTableVals] = useState<any[]>([]);
  const [passportUrl, setPassportUrl] = useState('');
  const [userId, setUserId] = useState('');
  const [birthCertificateUrl, setBirthCertificateUrl] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const [showPdf, setShowPdf] = useState(false);
  const resetState = () => {

    setShowForm(false);
    setFullName("");
    setPassportNumber("");
    setNationality("");
    setDateOfBirth("");
    setTravelDate("");
    setReturnDate("");
    setContactNumber("");
    setEmail("");
    setPurpose('');
    setDate('');
    setDuration('');
    setAccommodation('');
    setHistory('');
  };
  async function getUserData(userId: string) {
    const user = requests.find(element => element.userId === userId);

    if (user) {
      // Update state with the values from the matched user
      setFullName(user.fullName || '');
      setPassportNumber(user.passportNumber || '');
      setNationality(user.nationality || '');
      setDateOfBirth(user.dateOfBirth || '');
      setTravelDate(user.travelDate || '');
      setReturnDate(user.returnDate || '');
      setContactNumber(user.contactNumber || '');
      setEmail(user.email || '');
      setPurpose(user.purpose || '');
      setDate(user.date || '');
      setBirthCertificateUrl(user['Birth Certificate_Url'] || '');
      setPassportUrl(user['Passport Photo_Url'] || '');
      setUserId(userId);
      // setDuration(user.duration || '');
      // setAccommodation(user.accommodation || '');
      // setHistory(user.history || '');
    } else {
      // Handle case when userId is not found if needed
      console.warn(`No user found with userId: ${userId}`);
    }
    try {
      // Reference to the collection
      const travelFormsCollection = collection(db, 'travelForms');

      // Create a query against the collection
      const userQuery = query(travelFormsCollection, where('userId', '==', userId));

      // Execute the query
      const querySnapshot = await getDocs(userQuery);

      // Process the results
      const results = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log('Results:', results);
      setPurpose(results[0].purpose || '');
      setAccommodation(results[0].accommodation || '');
      setHistory(results[0].history || '');
      setDuration(results[0].duration || '');
      setDate(results[0].date || '');

    } catch (error) {
      console.error('Error fetching user data:', error);
    }
    setShowForm(true)
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'applications'));
        const documents = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log('Documents: ', documents);
        console.log('Documents: ', typeof (documents));
        setRequests(documents);
        setTableVals(documents.map((doc: any) => {
          return {
            userId: doc.userId,
            status: doc.status ? 'Approved' : 'Pending',
            name: doc.fullName,
            duration: doc.travelDate,
            country: doc.nationality
          }
        }))
      } catch (error) {
        console.error('Error retrieving data: ', error);
      }
    };

    fetchData();
  }, []);
  const Personal = () => {
    return <div>
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
        <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
        <form className="space-y-6">
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1" htmlFor="fullName">Full Name (as in passport)</label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              readOnly
              className="bg-gray-700 border border-gray-600 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1" htmlFor="passportNumber">Passport Number</label>
            <input
              id="passportNumber"
              type="text"
              value={passportNumber}
              readOnly
              className="bg-gray-700 border border-gray-600 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1" htmlFor="nationality">Nationality</label>
            <input
              id="nationality"
              type="text"
              value={nationality}
              readOnly
              className="bg-gray-700 border border-gray-600 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1" htmlFor="dateOfBirth">Date of Birth</label>
            <input
              id="dateOfBirth"
              type="text"
              value={dateOfBirth}
              readOnly
              className="bg-gray-700 border border-gray-600 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1" htmlFor="travelDate">Planned Travel Date</label>
            <input
              id="travelDate"
              type="text"
              value={travelDate}
              readOnly
              className="bg-gray-700 border border-gray-600 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1" htmlFor="returnDate">Return Date</label>
            <input
              id="returnDate"
              type="text"
              value={returnDate}
              readOnly
              className="bg-gray-700 border border-gray-600 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1" htmlFor="contactNumber">Contact Number</label>
            <input
              id="contactNumber"
              type="text"
              value={contactNumber}
              readOnly
              className="bg-gray-700 border border-gray-600 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1" htmlFor="email">Email Address</label>
            <input
              id="email"
              type="text"
              value={email}
              readOnly
              className="bg-gray-700 border border-gray-600 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* <Button type="button" className="bg-blue-500 hover:bg-blue-600 text-white">
            Edit
          </Button> */}
        </form>
      </div>
    </div>
  }
  const Travel = () => {
    return <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6">Visa Application Form</h2>
      <form onSubmit={() => { }} className="space-y-6">
        <div className="flex flex-col">
          <label htmlFor="purpose" className="text-sm font-medium mb-1">Purpose of Visit</label>
          <input
            id="purpose"
            type="text"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            placeholder="Enter the purpose of your visit"
            className="bg-gray-700 border border-gray-600 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="date" className="text-sm font-medium mb-1">Intended Date of Travel</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={() => { }}
            placeholder="Select the date of travel"
            className="bg-gray-700 border border-gray-600 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="duration" className="text-sm font-medium mb-1">Duration of Stay (in days)</label>
          <input
            id="duration"
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="Enter the duration of your stay"
            className="bg-gray-700 border border-gray-600 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="accommodation" className="text-sm font-medium mb-1">Accommodation Details (Address of hotel)</label>
          <input
            id="accommodation"
            type="text"
            value={accommodation}
            onChange={(e) => setAccommodation(e.target.value)}
            placeholder="Enter accommodation details"
            className="bg-gray-700 border border-gray-600 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="history" className="text-sm font-medium mb-1">Previous Travel History</label>
          <textarea
            id="history"
            rows={3}
            value={history}
            onChange={(e) => setHistory(e.target.value)}
            placeholder="Enter your previous travel history"
            className="bg-gray-700 border border-gray-600 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">
          Submit
        </button> */}
      </form>
    </div>
  }
  const documents = [
    { title: 'Birth Certificate', url: birthCertificateUrl },
    { title: 'Passport Photo', url: passportUrl },
    { title: 'Flight Ticket PDF', url: 'https://example.com/flight-ticket.pdf' },
    { title: 'Copy of Passport Detail Page', url: 'https://example.com/passport-detail-page.pdf' },
    { title: 'Proof of Accommodation', url: 'https://example.com/accommodation-proof.pdf' },
    { title: 'Travel Insurance', url: 'https://example.com/travel-insurance.pdf' },
  ];
  const PdfViewer = () => {


    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <h1>pdf</h1>
        <iframe
          src={pdfUrl || ''}
          title="PDF Viewer"
          width="100%"
          height="100%"
          style={{ border: 'none' }}
        />
      </div>
    );
  };
  const DocumentGrid: React.FC = () => {
    const handleViewClick = (url: string) => {

      // setPdfUrl(url);
      // setShowPdf(true);

      window.open(url, '_blank');
    };

    return (
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Supporting Documents</h2>
        <div className="grid grid-cols-2 gap-6">
          {documents.map((doc, index) => (
            <div key={index} className="bg-gray-700 p-4 rounded-lg shadow-md">
              <div className="flex flex-col items-center">
                <div className="mb-4">
                  <span className="text-blue-400">{doc.title}</span>
                </div>
                <button
                  onClick={() => handleViewClick(doc.url)}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  const [formValues] = useState({
    occupation: 'Software Developer',
    employer: 'Tech Inc.',
    workAddress: '123 Tech Lane, Silicon Valley, CA',
    sponsor: 'John Doe',
  });

  const handleViewDocument = (title: any) => {
    // Handle view document logic here, e.g., open a new page or modal with the document
    alert(`View ${title} document`);
  };
  const Finance = () => {
    return <div className="p-8 bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-6">Finance Details</h1>

      <div className="grid grid-cols-1 gap-6 mb-6">
        <div
          className="bg-gray-800 p-6 rounded-lg shadow-md cursor-pointer"
          onClick={() => handleViewDocument('Bank Account Statements')}
        >
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-blue-400 mr-4"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M14 7H7V4h7v3zm2-3h2v2h-2V4zm-3 3h2V4h-2v3zm5 0h2V4h-2v3zm0 6h-2v-3h2v3zM4 16h7v-3H4v3zm0 0h7v-3H4v3zm11-6h2v-3h-2v3zm0 6h2v-3h-2v3zM4 10h7V7H4v3z" />
            </svg>
            <div className="text-lg font-semibold">Bank Account Statements</div>
          </div>
        </div>
      </div>

      <form className="space-y-6">
        <div className="flex flex-col space-y-4">
          <div>
            <label className="block text-sm font-medium">Occupation</label>
            <input
              type="text"
              value={formValues.occupation}
              readOnly
              className="mt-1 p-2 w-full bg-gray-800 border border-gray-600 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Employer</label>
            <input
              type="text"
              value={formValues.employer}
              readOnly
              className="mt-1 p-2 w-full bg-gray-800 border border-gray-600 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Work Address</label>
            <input
              type="text"
              value={formValues.workAddress}
              readOnly
              className="mt-1 p-2 w-full bg-gray-800 border border-gray-600 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Sponsorship Details</label>
            <input
              type="text"
              value={formValues.sponsor}
              readOnly
              className="mt-1 p-2 w-full bg-gray-800 border border-gray-600 rounded-md"
            />
          </div>
        </div>

      </form>
    </div>
  }
  const VisaApproval = () => {
    const [isInterpolChecked, setIsInterpolChecked] = useState(false);
    const [isApproved, setIsApproved] = useState(false);

    const handleCheckInterpol = () => {
      // Simulate checking Interpol blacklist
      checkRedList(fullName.split(' ')[0], fullName, 18, 120)
        .then(isRedListed => {
          if (isRedListed) {
            alert('Interpol redlisted ');
          } else {

            alert('Interpol redlist check completed.');
          }
        });
      // setTimeout(() => {
      //   setIsInterpolChecked(true);
      //   alert('Interpol blacklist check completed.');
      // }, 1000);
    };
    async function checkRedList(forename: any, name: any, ageMin: any, ageMax: any) {
      const url = new URL('https://ws-public.interpol.int/notices/v1/red');
      const params = {
        forename: forename,
        name: name,

        ageMin: ageMin,
        ageMax: ageMax,
        resultPerPage: 1 // Set this to 1 as we only need to know if they are listed
      };

      // Append parameters to the URL
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

      try {
        const response = await fetch(url.toString(), {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Check if the user is listed
        if (data.total > 0) {
          console.log('User is red-listed by Interpol.');
          return true;
        } else {
          console.log('User is not red-listed by Interpol.');
          return false;
        }
      } catch (error) {
        console.error('Error checking red list:', error);
        return false;
      }
    }
    const handleApproveVisa = async () => {
      // if (!isInterpolChecked) {
      //   alert('Please check Interpol blacklist before approving.');
      //   return;
      // }

      // EmailJS service configuration
      const templateParams = {
        to_email: email, // Change to the recipient's email
        subject: 'Visa Approval Notification',
        message: 'The visa application has been approved.',
      };

      emailjs.send('service_gi4im47', 'template_bj8gl0j', templateParams, 'nf0Wh8F1ir31GT_wS')
        .then((response: any) => {
          console.log('Email sent successfully:', response);
          setIsApproved(true);
          alert('Visa approved and email sent!');
        })
        .catch((error: any) => {
          console.error('Error sending email:', error);
          alert('Visa approved, but there was an error sending the email.');
        });
      try {
        // Reference to the travelForms collection
        const travelFormsCollection = collection(db, 'applications');

        // Create a query to find the document(s) with the specified userId
        const userQuery = query(travelFormsCollection, where('userId', '==', userId));

        // Execute the query
        const querySnapshot = await getDocs(userQuery);

        // Iterate over the documents in the query snapshot
        querySnapshot.forEach(async (document) => {
          // Get a reference to the document
          const docRef = doc(db, 'travelForms', document.id);

          // Update the status field to true
          await updateDoc(docRef, {
            status: true
          });

          console.log(`Document with ID ${document.id} updated successfully.`);
        });

      } catch (error) {
        console.error("Error updating status: ", error);
      }
    };

    return (
      <div className="p-8 bg-gray-900 text-white">
        <h1 className="text-2xl font-bold mb-6">Visa Approval</h1>

        <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
          <div className="flex items-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-blue-400 mr-4"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 3v18m9-9H3" />
            </svg>
            <div className="text-lg font-semibold">Visa Application Details</div>
          </div>
          <p className="text-sm">
            Ensure that all the checks are completed before approving the visa.
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleCheckInterpol}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md"
          >
            Check Interpol Blacklist
          </button>

          <button
            onClick={handleApproveVisa}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md"
          >
            Approve Visa
          </button>
        </div>

        {isApproved && (
          <div className="mt-6 p-4 bg-green-800 rounded-md">
            <p className="text-lg font-semibold">Visa Status:</p>
            <p className="text-sm">The visa has been approved.</p>
          </div>
        )}
      </div>
    );
  };

  const Form = () => {
    return <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="personal">Personal Information</TabsTrigger>
        <TabsTrigger value="travel">Travel Information</TabsTrigger>
        <TabsTrigger value="supporting">Supporting documents</TabsTrigger>
        <TabsTrigger value="finance">Finance Information</TabsTrigger>
        <TabsTrigger value="approve">Approve</TabsTrigger>
      </TabsList>
      <TabsContent value="personal"><Personal />
      </TabsContent>
      <TabsContent value="travel"><Travel /></TabsContent>
      <TabsContent value="supporting"> <DocumentGrid /></TabsContent>
      <TabsContent value="finance"><Finance /></TabsContent>
      <TabsContent value="approve"><VisaApproval /></TabsContent>
    </Tabs>

  }
  const TableComp = ({ requestst }: any) => {
    return <div><Table>
      <TableCaption>list of recent visa requests.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">User ID</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Country</TableHead>
          <TableHead>Travel Date</TableHead>
          <TableHead className="text-right">Proceed</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requestst.map((request: any) => (
          <TableRow key={request.userId}>
            <TableCell className="font-medium">{request.userId}</TableCell>
            <TableCell>{request.status}</TableCell>
            <TableCell>{request.name}</TableCell>
            <TableCell>{request.country}</TableCell>
            <TableCell>{request.duration}</TableCell>
            <TableCell className="text-right">
              <Button onClick={() => { getUserData(request.userId) }}>Proceed</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table></div>
  }
  const _handleProceed = () => {
    setShowForm(true)
  }

  return (
    <>
      <div className='w-full' >
        <Menubar className='w-full' style={{ "width": "100vw", "marginTop": "0px" }}>
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                New Tab <MenubarShortcut>⌘T</MenubarShortcut>
              </MenubarItem>
              <MenubarItem onClick={() => { setShowForm(false); resetState(); }}>Visa Requests</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Export</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Print</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Sort By</MenubarTrigger>
            <MenubarContent>

              <MenubarItem>Date</MenubarItem>
              <MenubarItem>Duration</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Share</MenubarItem>

            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>View</MenubarTrigger>
            <MenubarContent>

              <MenubarItem>All</MenubarItem>
              <MenubarItem>Unprocessed</MenubarItem>


            </MenubarContent>
          </MenubarMenu>
        </Menubar>
        {showForm ? <Form /> : <TableComp requestst={tableVals} />}

      </div>
    </>
  )
}

export default App
