package task24;

public final class Address extends Customer{
    private String cityName;
    private int zipCode;
    private String streetName;
    private int buildingNumber;
    private int buildingLetter;
    private int apartmentNumber;
    public Address EMPTY_ADDRESSS;

    public String getCityName() {
        return cityName;
    }

    public int getZipCode() {
        return zipCode;
    }

    public String getStreetName() {
        return streetName;
    }

    public int getBuildingNumber() {
        return buildingNumber;
    }

    public int getBuildingLetter() {
        return buildingLetter;
    }

    public int getApartmentNumber() {
        return apartmentNumber;
    }
}
