import React from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function MapScreen({ route }) {
  console.log(route.params);
  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={{
          latitude: route.params.location.coords.latitude,
          longitude: route.params.location.coords.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.006,
        }}
        mapType="standart"
      >
        <Marker
          coordinate={{
            latitude: route.params.location.coords.latitude,
            longitude: route.params.location.coords.longitude,
          }}
          title={route.params.photoName}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapStyle: {
    flex: 1,
  },
});
