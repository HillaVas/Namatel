<More title='ویژه‌ها'/>

<View style={styles.specialsContainer}>
  <SpecialCard image={require('./../assets/graphics/banner_1.jpg')}/>
  <SpecialCard image={require('./../assets/graphics/banner_2.jpg')}/>
  <SpecialCard image={require('./../assets/graphics/banner_3.jpg')}/>
</View>

<More title='سریالهای برگزیده' />

<FlatList
  style={styles.series}
  data={this.state.series}
  horizontal={true}
  renderItem={({item}) => this.renderSeriesItem(item)}
  keyExtractor={item => item.name + ''}
/>

<More title='کنسرتها'/>

<TouchableOpacity style={styles.concert} activeOpacity={.8}>
  <Image style={styles.concertImage} source={require('./../assets/graphics/concert.png')}/>

  <View style={styles.concertInfo}>
    <Text style={styles.concertTitle}>مشاهده‌ی پخش زنده‌ی کنسرت آنتاما در تهران</Text>
  </View>

</TouchableOpacity>

<More title='فیلمهای برگزیده'/>

<FlatList
  style={styles.series}
  data={this.state.movies}
  horizontal={true}
  renderItem={({item}) => this.renderSeriesItem(item)}
  keyExtractor={item => item.name + ''}
/>

<View style={{marginBottom:30}}/>
