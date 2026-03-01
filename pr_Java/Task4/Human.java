package Task4;

public class Human {
    static class Head{
        public String eye;
        public int volos;

        public Head(String eye, int volos) {
            this.eye = eye;
            this.volos = volos;
        }

        public String getEye() {
            return eye;
        }

        public void setEye(String eye) {
            this.eye = eye;
        }

        public int getVolos() {
            return volos;
        }

        public void setVolos(int volos) {
            this.volos = volos;
        }

        @Override
        public String toString() {
            return "Head{" +
                    "eye='" + eye + '\'' +
                    ", volos='" + volos + '\'' +
                    '}';
        }
    }
    static class Leg{
        public int Razmer;

        public Leg(int razmer) {
            Razmer = razmer;
        }

        public int getRazmer() {
            return Razmer;
        }

        public void setRazmer(int razmer) {
            Razmer = razmer;
        }

        @Override
        public String toString() {
            return "Leg{" +
                    "Razmer=" + Razmer +
                    '}';
        }
    }
    static class Hand{
        public int ling;

        public Hand(int ling) {
            this.ling = ling;
        }

        public int getLing() {
            return ling;
        }

        public void setLing(int ling) {
            this.ling = ling;
        }

        @Override
        public String toString() {
            return "Hand{" +
                    "ling=" + ling +
                    '}';
        }
    }
    public int Rost;
    public String name;
    public Human(int rost, String name) {
        Rost = rost;
        this.name = name;
    }
    public int getRost() {
        return Rost;
    }
    public void setRost(int rost) {
        Rost = rost;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Human{" +
                "Rost=" + Rost +
                ", name='" + name + '\'' +
                '}';
    }

    static public void main(String[] args){
        Human h = new Human(170, "LOK");
        System.out.println(h);
        Hand h2 = new Hand(12);
        System.out.println(h2);
        Leg l = new Leg(12);
        System.out.println(l);
        Head h3 = new Head("red", 12);
        System.out.println(h3);

    }
}
