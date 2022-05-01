**Commands**

- Setup with `make setup`
- Generate factory `make generate-factory`

* NOTE: if you re generate factory. You need to update this line manual. Go to ./react-native-fresa-ui/typechain/factories/Fresaclub__factory.ts
line 541. Change this:

```
if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
```

To this:
```
super(_abi, _bytecode, args[0]);
```