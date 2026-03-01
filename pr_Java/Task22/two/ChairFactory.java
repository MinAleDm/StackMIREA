package Task22.two;

public class ChairFactory implements AbstractChairFactory {

    @Override
    public VictorianChair createVictorianChair() {
        return new VictorianChair(35);
    }

    @Override
    public MagicChair createMagicanChair() {
        return new MagicChair();
    }
    @Override
    public FunctionalChair createFunctionalChair() {
        return new FunctionalChair();
    }
}
