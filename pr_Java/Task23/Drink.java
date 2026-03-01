package Task23;

final class Drink implements Item{

    private int coast;
    private String name;
    private String description;
    Drink(String name,String description){
        this.coast = 0;
        this.name = name;
        this.description = description;
    }
    Drink(int coast,String name,String description){
        this.coast = coast;
        this.name = name;
        this.description = description;
    }
    @Override
    public int getCoast() {
        return coast;
    }
    @Override
    public String getName() {
        return name;
    }
    @Override
    public String getDescription() {
        return description;
    }

    @Override
    public void setCoast(int coast) {
        this.coast = coast;
    }

    @Override
    public void setName(String name) {
        this.name = name;
    }

    @Override
    public void setDescription(String description) {
        this.description = description;
    }
}
