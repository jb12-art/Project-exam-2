// src/components/VenueForm.tsx

import { useState } from 'react';
import type { Venue } from '../types/venues';
import { createVenue, updateVenue } from '../api/venues';
import styles from './VenueForm.module.css';

// one form for Create and Edit
interface Props {
  venue?: Venue;
  onSaved: () => void | Promise<void>;
}

export default function VenueForm({ venue, onSaved }: Props) {
  const [city, setCity] = useState(venue?.location.city || '');
  const [country, setCountry] = useState(venue?.location.country || '');
  const [address, setAddress] = useState(venue?.location.address || '');
  const [zip, setZip] = useState(venue?.location.zip || '');

  const [name, setName] = useState(venue?.name || '');

  const [description, setDescription] = useState(venue?.description || '');

  const [price, setPrice] = useState(venue?.price || 0);

  const [maxGuests, setMaxGuests] = useState(venue?.maxGuests || 1);

  const [imageUrl, setImageUrl] = useState(venue?.media[0]?.url || '');

  const [imageAlt, setImageAlt] = useState(venue?.media[0]?.alt || '');

  const [rating, setRating] = useState(venue?.rating || 0);

  const [wifi, setWifi] = useState(venue?.meta.wifi || false);
  const [parking, setParking] = useState(venue?.meta.parking || false);
  const [breakfast, setBreakfast] = useState(venue?.meta.breakfast || false);
  const [pets, setPets] = useState(venue?.meta.pets || false);

  const [message, setMessage] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage('');

    const venueData = {
      name,
      description,
      price,
      maxGuests,

      media: imageUrl
        ? [
            {
              url: imageUrl,
              alt: imageAlt,
            },
          ]
        : [],
      rating,

      meta: {
        wifi,
        parking,
        breakfast,
        pets,
      },

      location: {
        city,
        country,
        address,
        zip,
      },
    };

    // reset create venue values after you create a venue
    try {
      if (venue) {
        await updateVenue(venue.id, venueData);

        setMessage('Venue updated successfully.');
      } else {
        await createVenue(venueData);

        setMessage('Venue created successfully.');

        setCity('');
        setCountry('');
        setAddress('');
        setZip('');
        setName('');
        setDescription('');
        setPrice(0);
        setMaxGuests(1);
        setImageUrl('');
        setImageAlt('');
        setRating(0);
        setWifi(false);
        setParking(false);
        setBreakfast(false);
        setPets(false);
      }

      await onSaved();
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage('Something went wrong.');
      }
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>{venue ? 'Edit venue' : 'Create venue'}</h2>

      {/* city */}
      <label htmlFor="venueCity">City</label>
      <input
        className={styles.inputCity}
        id="venueCity"
        type="text"
        value={city}
        onChange={(event) => setCity(event.target.value)}
        required
      />

      {/* country */}
      <label htmlFor="venueCountry">Country</label>
      <input
        className={styles.inputCountry}
        id="venueCountry"
        type="text"
        value={country}
        onChange={(event) => setCountry(event.target.value)}
        required
      />

      {/* address */}
      <label htmlFor="venueAddress">Address</label>
      <input
        className={styles.inputAddress}
        id="venueAddress"
        type="text"
        value={address}
        onChange={(event) => setAddress(event.target.value)}
        required
      />

      {/* zip */}
      <label htmlFor="venueZip">Zip</label>
      <input
        className={styles.inputZip}
        id="venueZip"
        type="text"
        value={zip}
        onChange={(event) => setZip(event.target.value)}
        required
      />

      {/* name */}
      <label htmlFor="venueName">Name</label>

      <input
        className={styles.inputName}
        id="venueName"
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        required
      />

      {/* description */}
      <label htmlFor="venueDescription">Description</label>

      <textarea
        className={styles.textarea}
        id="venueDescription"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        required
      />

      {/* price */}
      <label htmlFor="venuePrice">Price per night</label>

      <input
        className={styles.inputPrice}
        id="venuePrice"
        type="number"
        min="1"
        value={price}
        onChange={(event) => setPrice(Number(event.target.value))}
        required
      />

      {/* guests */}
      <label htmlFor="venueGuests">maximum guests</label>

      <input
        className={styles.inputGuests}
        id="venueGuests"
        type="number"
        min="1"
        value={maxGuests}
        onChange={(event) => setMaxGuests(Number(event.target.value))}
        required
      />

      {/* img url */}
      <label htmlFor="venueImage">Image URL</label>

      <input
        className={styles.inputUrl}
        id="venueImage"
        type="url"
        value={imageUrl}
        onChange={(event) => setImageUrl(event.target.value)}
      />
      {/* img preview in create venue*/}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={imageAlt || 'Venue preview'}
          className={styles.imagePreview}
        />
      )}

      {/* img alt */}
      <label htmlFor="venueImageAlt">Image alt text</label>

      <input
        className={styles.inputAlt}
        id="venueImageAlt"
        type="text"
        value={imageAlt}
        onChange={(event) => setImageAlt(event.target.value)}
      />

      {/* rating */}
      <label htmlFor="venueRating">Rating</label>
      <select
        className={styles.ratingSelect}
        id="venueRating"
        value={rating}
        onChange={(event) => setRating(Number(event.target.value))}
      >
        <option value="0">Choose rating</option>
        <option value="1">★ 1</option>
        <option value="2">★ 2</option>
        <option value="3">★ 3</option>
        <option value="4">★ 4</option>
        <option value="5">★ 5</option>
      </select>

      {/* venue facilities */}
      <fieldset className={styles.meta}>
        <legend>Venue facilities</legend>

        <label>
          <input
            type="checkbox"
            checked={wifi}
            onChange={(event) => setWifi(event.target.checked)}
          />
          Wifi
        </label>

        <label>
          <input
            type="checkbox"
            checked={parking}
            onChange={(event) => setParking(event.target.checked)}
          />
          Parking
        </label>

        <label>
          <input
            type="checkbox"
            checked={breakfast}
            onChange={(event) => setBreakfast(event.target.checked)}
          />
          Breakfast
        </label>

        <label>
          <input
            type="checkbox"
            checked={pets}
            onChange={(event) => setPets(event.target.checked)}
          />
          Pets
        </label>
      </fieldset>

      {/* meta */}
      <div>
        {venue?.meta.wifi && <span>Wifi</span>}
        {venue?.meta.parking && <span>Parking</span>}
        {venue?.meta.breakfast && <span>Breakfast</span>}
        {venue?.meta.pets && <span>Pets</span>}
      </div>

      <button className={styles.createVenueBtn} type="submit">
        {venue ? 'Save changes' : 'Create venue'}
      </button>

      {message && <p>{message}</p>}
    </form>
  );
}
